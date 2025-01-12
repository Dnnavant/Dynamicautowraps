module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': '<rootDir>/tests/styleMock.js',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/fileMock.js'
    }
}; 