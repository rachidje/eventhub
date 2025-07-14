import path from "path";
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from "testcontainers";

let instance: StartedDockerComposeEnvironment | null = null;

export const startDocker = async () => {
    const composeFilePath = path.resolve(__dirname);
    const compileFile = 'docker-compose.yml';
    instance = await new DockerComposeEnvironment(composeFilePath, compileFile).up();
    console.log('Docker compose instance is running');
}

export const stopDocker = async () => {
    if (!instance) {
        return;
    }

    try {
        await instance.down();
        instance = null;
    } catch (error) {
        console.error('Error stopping docker', error);
    }
}

export const getDockerComposeInstance = (): StartedDockerComposeEnvironment => {
    if (!instance) {
        throw new Error('Docker compose instance is not running');
    }

    return instance;
};

export const getDatabaseUrl = (): string => {
    if (!instance) {
        throw new Error("Docker compose instance is not running");
    }

    return `postgresql://test_user:test_password@localhost:5433/test_db`;
};
