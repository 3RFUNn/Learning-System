import { describe } from "mocha";
import { setupGlobalFixtures, teardownGlobalFixtures } from "../../fixtures.js";
import { expect } from "chai";
import sinon from "sinon";
import { getRoomsHandler } from "../room.controller.js";

describe("RoomController - addStudentToRoomHandler", function () {
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

    it("should get rooms with pagination and filtering options", async () => {
        const roomNumber = 7;
        const req = {
            query: {
                roomNumber,
                page: 1,
                pageSize: 10,
            },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Call the handler
        await getRoomsHandler(req, res);

        // Assertions
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.args[0][0]).to.be.an("object");
        expect(res.json.args[0][0].ok).to.equal(true);
        expect(res.json.args[0][0].data).to.be.an("array");
        expect(res.json.args[0][0].data).to.have.lengthOf(1);

        const room = res.json.args[0][0].data[0];
        expect(room).to.have.property("roomNumber").to.equal(roomNumber);

        expect(res.json.args[0][0].pagination).to.be.an("object");
        expect(res.json.args[0][0].pagination).to.have.property("page").to.equal(1);
        expect(res.json.args[0][0].pagination).to.have.property("pageSize").to.equal(10);
        expect(res.json.args[0][0].pagination).to.have.property("totalCount").to.equal(1);
        expect(res.json.args[0][0].pagination).to.have.property("totalPages").to.equal(1);
    });

    it("should return only active rooms if active filter is true", async () => {
        const req = {
            query: {
                isActive: "true",
                page: 1,
                pageSize: 5,
            },
        };

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        // Call the handler
        await getRoomsHandler(req, res);

        // Assertions
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.args[0][0]).to.be.an("object");
        expect(res.json.args[0][0].ok).to.equal(true);
        expect(res.json.args[0][0].data).to.be.an("array");
        expect(res.json.args[0][0].data).to.have.length.greaterThan(1);
        res.json.args[0][0].data.forEach((room) => {
            expect(room.isActive, "Should only return active rooms").to.be.true;
        });

        expect(res.json.args[0][0].pagination).to.be.an("object");
        expect(res.json.args[0][0].pagination).to.have.property("page").to.equal(req.query.page);
        expect(res.json.args[0][0].pagination).to.have.property("pageSize").to.equal(req.query.pageSize);
    });

    // it("should add students to the room successfully", async () => {
    //     const roomId = "room123";
    //     const studentIds = ["student123", "student456"];

    //     const req = {
    //         params: { id: roomId },
    //         body: { studentIds },
    //     };

    //     const res = {
    //         status: sinon.stub().returnsThis(),
    //         json: sinon.stub(),
    //     };

    //     // Stub RoomModel findById method
    //     sinon.stub(models.RoomModel, "findById").returns({
    //         _id: roomId,
    //         currentResidents: [],
    //         save: sinon.stub(),
    //         populate: sinon.stub().callsFake(function () {
    //             return {
    //                 exec: sinon.stub(),
    //             };
    //         }),
    //     });

    //     // Stub StudentModel find method
    //     sinon.stub(models.StudentModel, "find").returns([
    //         { _id: "student123", studentNumber: "S123" },
    //         { _id: "student456", studentNumber: "S456" },
    //     ]);

    //     // Call the handler
    //     await addStudentToRoomHandler(req, res);

    //     // Assertions
    //     expect(res.status.calledWith(200), "Successful response 200").to.be.true;
    //     expect(res.json.calledOnce, "Respond with JSON").to.be.true;
    //     expect(res.json.args[0][0]).to.be.an("object");
    //     expect(res.json.args[0][0].ok).to.equal(true);
    //     expect(res.json.args[0][0].data).to.be.an("object");
    //     expect(res.json.args[0][0].data).to.have.property("_id").to.equal(roomId);
    //     expect(res.json.args[0][0].data).to.have.property("currentResidents").to.have.lengthOf(2);

    //     // Restore the stubs
    //     models.RoomModel.findById.restore();
    //     models.StudentModel.find.restore();
    // });
});
