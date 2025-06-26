export default {
    collectCoverage: true,
    coverageDirectory: '../coverage',
    coverageReporters: ['lcov', 'text', 'cobertura'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '\\.test\\.ts$',
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src',
    moduleNameMapper: {
        "^@event/(.*)$": "<rootDir>/modules/event/$1",
        "^@calendar/(.*)$": "<rootDir>/modules/calendar/$1",
        "^@venue/(.*)$": "<rootDir>/modules/venue/$1",
        "^@organizer/(.*)$": "<rootDir>/modules/organizer/$1",
        "^@api/(.*)$": "<rootDir>/modules/api/$1",
        "^@shared/(.*)$": "<rootDir>/modules/shared/$1",
    }
};