export default {
    collectCoverage: true,
    coverageDirectory: '../coverage',
    coverageReporters: ['lcov', 'text', 'cobertura'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '^(?!.*\\.e2e\\.test\\.ts$).*\\.test\\.ts$',
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src',
    moduleNameMapper: {
        "^@event/(.*)$": "<rootDir>/modules/event-management/$1",
        "^@user/(.*)$": "<rootDir>/modules/user-management/$1",
        "^@calendar/(.*)$": "<rootDir>/modules/calendar/$1",
        "^@venue/(.*)$": "<rootDir>/modules/venue/$1",
        "^@api/(.*)$": "<rootDir>/api/$1",
        "^@shared/(.*)$": "<rootDir>/modules/shared/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1"
    }
};