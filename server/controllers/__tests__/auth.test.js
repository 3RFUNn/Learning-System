import { itManagerData, setupGlobalFixtures, teardownGlobalFixtures } from "../../fixtures.js";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../../utils/jwt.js";
import { loginUser } from "../auth.action.js";
import sinon from "sinon";
import { expect } from "chai";
describe("Auth Module Tests", function () {
    this.timeout(10_000);

    before(async () => {
        console.log("before called");
        await setupGlobalFixtures();
    });

    afterEach(function () {
        sinon.restore();
    });

    after(async () => {
        console.log("Running after");
        await teardownGlobalFixtures();
        console.log("Ending after");
    });

    describe("loginUser", () => {
        it("should return a valid token for a valid user", async () => {
            const token = await loginUser(itManagerData._id, "test_password");

            console.log({ token });
            expect(token).to.be.a("string");
        });

        it("should return null for an invalid password", async () => {
            const token = await loginUser(itManagerData._id, "incorrectPassword");

            expect(token).to.be.null;
        });
    });

    describe("Authentication Middleware - authenticateToken", function () {
        it("should authenticate and set authData for a valid token", () => {
            const req = {
                path: "/some-route",
                headers: {
                    authorization: "Bearer validToken",
                },
            };

            const res = {
                sendStatus: sinon.stub(),
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.stub();

            sinon.stub(jwt, "verify").callsFake((token, secret, callback) => {
                callback(null, { userType: "itmanager" }); // Simulate a successful verification with itmanager userType
            });

            authenticateToken(req, res, next);

            expect(res.sendStatus.called).to.be.false;
            expect(res.status.called).to.be.false;
            expect(res.json.called).to.be.false;
            expect(next.calledOnce).to.be.true;
            expect(req.authData).to.deep.equal({ userType: "itmanager" });

            jwt.verify.restore();
        });

        it("should handle authentication errors", () => {
            const req = {
                path: "/admin/",
                headers: {
                    authorization: "Bearer invalidToken",
                },
            };

            const res = {
                sendStatus: sinon.stub(),
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.stub();

            sinon.stub(jwt, "verify").callsFake((token, secret, callback) => {
                callback("Authentication error", null);
            });

            authenticateToken(req, res, next);

            expect(res.status.calledWith(403), "403 Response").to.be.true;
            expect(res.status.calledOnce, "Should be called once").to.be.true;
            expect(res.json.calledOnce, "Should be called once").to.be.true;
            expect(next.called, "Should not call next").to.be.false;
            expect(req.authData, "Auth Data should be undefined").to.be.undefined;
        });

        it("should handle access denied for unauthorized userType", () => {
            const req = {
                path: "/admin/some-route",
                headers: {
                    authorization: "Bearer validToken",
                },
            };

            const res = {
                sendStatus: sinon.stub(),
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };

            const next = sinon.stub();

            // Stub jwt.verify to simulate an authentication error
            sinon.stub(jwt, "verify").callsFake((token, secret, callback) => {
                callback("Authentication error", null);
            });

            authenticateToken(req, res, next);

            expect(res.status.calledWith(403)).to.be.true;
            expect(res.status.calledOnce).to.be.true;
            expect(res.json.calledOnce).to.be.true;
            expect(next.called).to.be.false;
            expect(req.authData).to.be.undefined;

            jwt.verify.restore();
        });
    });
});
