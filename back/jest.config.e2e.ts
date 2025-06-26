export default {
    collectCoverage: false,
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '\\.e2e\\.test\\.ts$',
    testTimeout: 8 * 1000,
    maxWorkers: 1,
    rootDir: 'src',
    moduleNameMapper: {
        "^@event/(.*)$": "<rootDir>/modules/event/$1",
        "^@calendar/(.*)$": "<rootDir>/modules/calendar/$1",
        "^@venue/(.*)$": "<rootDir>/modules/venue/$1",
        "^@organizer/(.*)$": "<rootDir>/modules/organizer/$1",
        "^@api/(.*)$": "<rootDir>/api/$1",
        "^@shared/(.*)$": "<rootDir>/modules/shared/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1"
    }
};
    