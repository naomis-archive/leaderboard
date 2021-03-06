import { assert } from "chai";
import { compileReports } from "../../controllers/crowdin/modules/compileReports";
import { CrowdinContribsInt } from "../../interfaces/crowdin/CrowdinContribsInt";
import { FinalReportInt } from "../../interfaces/crowdin/FinalReportInt";

const mockFinalReport: FinalReportInt[] = [
  {
    name: "test report",
    url: "https://localhost:8000",
    unit: "words",
    dateRange: {
      from: "yesterday",
      to: "today",
    },
    language: "TypeScript",
    data: [
      {
        user: {
          id: "12",
          username: "nhcarrigantest",
          fullName: "Naomi Carrigan (nhcarrigan)",
          avatarUrl: "https://localhost:8000/avatar",
        },
        languages: [
          {
            id: "1",
            name: "TypeScript",
          },
        ],
        translated: 4000,
        approved: 1000,
        voted: 5000,
        positiveVotes: 4999,
        negativeVotes: 1,
        winning: 3,
      },
      {
        user: {
          id: "12",
          username: "nhcarrigan",
          fullName: "I am staff",
          avatarUrl: "https://localhost:8000/avatar",
        },
        languages: [
          {
            id: "1",
            name: "TypeScript",
          },
        ],
        translated: 4000,
        approved: 1000,
        voted: 5000,
        positiveVotes: 4999,
        negativeVotes: 1,
        winning: 3,
      },
    ],
  },
];

const expectedResult: CrowdinContribsInt[] = [
  {
    name: "Naomi Carrigan (nhcarrigan)",
    username: "nhcarrigantest",
    languages: ["TypeScript"],
    translations: 4000,
    approvals: 1000,
    votes: 5000,
    avatar: "https://localhost:8000/avatar",
  },
];

suite("Crowdin modules", () => {
  test("Compile report", async () => {
    const result = compileReports(mockFinalReport);
    assert.deepEqual(
      result[0],
      expectedResult[0],
      "did not parse data correctly."
    );
  });

  test("Should filter out staff", async () => {
    const result = compileReports(mockFinalReport);
    const staff = result.find((el) => el.name === "I am staff");
    assert.isUndefined(staff, "did not filter out staff data");
  });
});
