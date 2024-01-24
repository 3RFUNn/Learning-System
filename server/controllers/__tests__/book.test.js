import { describe } from "mocha";
import { setupGlobalFixtures, teardownGlobalFixtures } from "../../fixtures.js";
import { addBookHandler, getAllBooksHandler, searchAndFilterBooksHandler } from "../book.controller.js";
import { expect } from "chai";
import sinon from "sinon";

describe("BookController", function () {
    this.timeout(10_000);

    before(async () => {
        console.log("before called");
        await setupGlobalFixtures();
    });

    after(async () => {
        console.log("Running after");
        await teardownGlobalFixtures();
        console.log("Ending after");
    });

    it("should return a list of books for a search criteria with pagination information", async () => {
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const req = {
            query: {
                name: "The Great Gatsby",
                page: 1,
                pageSize: 2,
            },
        };

        await searchAndFilterBooksHandler(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.args[0][0]).to.be.an("object");
        expect(res.json.args[0][0].data).to.be.an("array");
        expect(res.json.args[0][0].data.length).to.be.greaterThanOrEqual(1);
        expect(res.json.args[0][0].pagination).to.be.an("object");
        expect(res.json.args[0][0].pagination.page).to.equal(1);
        expect(res.json.args[0][0].pagination.pageSize).to.equal(2);
    });

    it("Should return only available books if filtering only available is on", async () => {
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const req = {
            query: {
                available: true,
                page: 1,
                pageSize: 2,
            },
        };

        await searchAndFilterBooksHandler(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.args[0][0]).to.be.an("object");
        expect(res.json.args[0][0].data).to.be.an("array");
        expect(res.json.args[0][0].data.length).to.be.greaterThanOrEqual(1);
        expect(res.json.args[0][0].pagination).to.be.an("object");
        expect(res.json.args[0][0].pagination.page).to.equal(1);
        expect(res.json.args[0][0].pagination.pageSize).to.equal(2);
    });

    it("should return a list of books with pagination information", async () => {
        const req = { query: { pageSize: 2, page: 1 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await getAllBooksHandler(req, res);

        // Assertions
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.args[0][0]).to.be.an("object");
        expect(res.json.args[0][0].ok).to.equal(true);
        expect(res.json.args[0][0].data).to.be.an("array");
        expect(res.json.args[0][0].data.length).to.equal(2);
        expect(res.json.args[0][0].pagination).to.be.an("object");
        expect(res.json.args[0][0].pagination.page).to.equal(1);
        expect(res.json.args[0][0].pagination.pageSize).to.equal(2);
    });

    it("should successfully add a book for a user with access", async () => {
        // Mock request
        const req = {
            body: {
                name: "Test Book",
                author: "Test Author",
                publishYear: 2022,
                classification: "Test Classification",
                totalCount: 5,
            },
            authData: {
                userType: "libmanager", // Assuming libmanager has access
            },
        };

        // Mock response
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Call the handler
        await addBookHandler(req, res);

        // Assertions
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.args[0][0]).to.be.an("object");
        expect(res.json.args[0][0].ok).to.equal(true);
        expect(res.json.args[0][0].data).to.be.an("object");
        expect(res.json.args[0][0].data).to.have.property("name", "Test Book");
        expect(res.json.args[0][0].data).to.have.property("author", "Test Author");
        expect(res.json.args[0][0].data).to.have.property("publishYear", 2022);
        expect(res.json.args[0][0].data).to.have.property("classification", "Test Classification");
        expect(res.json.args[0][0].data).to.have.property("totalCount", 5);
        expect(res.json.args[0][0].data).to.have.property("availableCount", 5);
    });
});
