export default {
    collectCoverage: true,
    coverageDirectory: '../coverage',
    coverageReporters: ['lcov', 'text', 'cobertura'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '\\.test\\.ts$',
    coverageProvider: 'v8',
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: 'src'
};