export default {
    collectCoverage: true,
    coverageDirectory: '../coverage',
    coverageReporters: ['lcov', 'text', 'cobertura'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '\\.e2e\\.test\\.ts$',
    testTimeout: 8 * 1000,
    maxWorkers: 1,
    rootDir: 'src',
    moduleNameMapper: {
        "^@event/(.*)$": "<rootDir>/modules/event-management/$1",
        "^@user/(.*)$": "<rootDir>/modules/user-management/$1",
        "^@calendar/(.*)$": "<rootDir>/modules/calendar/$1",
        "^@venue/(.*)$": "<rootDir>/modules/venue/$1",
        "^@api/(.*)$": "<rootDir>/api/$1",
        "^@shared/(.*)$": "<rootDir>/modules/shared/$1",
        "^@tests/(.*)$": "<rootDir>/tests/$1"
    },
    setupFiles: ["<rootDir>/tests/setup/load-env.ts"],
    globalSetup: "<rootDir>/tests/setup/global-setup.ts",
    globalTeardown: "<rootDir>/tests/setup/global-teardown.ts"
};
