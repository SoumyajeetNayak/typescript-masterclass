console.clear();

/**
 * DI Container
 * ConsoleLoggerService: new ConsoleLoggerService()
 * UserService: new UserService()
 */

class Container {
    private services = new Map();
    public register<T>(token: new (...args: any[]) => T, instance: T) {
        this.services.set(token, instance);
    }
    public resolve<T>(token: new (...args: any[]) => T) {
        const service = this.services.get(token);
        if (!service) {
            throw new Error(`Service not found for token: ${token}`)
        }
        return service;
    }
}

const container  = new Container();

function Injectable<T extends { new (...args: any[]): {}}>(BaseClassEntity: T) {
    container.register(BaseClassEntity, new BaseClassEntity)
}

function Inject(token: any) {
    return function(target: any, propertyKey: string) {
        const serviceInstance = container.resolve(token);
        Object.defineProperty(target, propertyKey, {
            get: () => serviceInstance,
            enumerable: true,
            configurable: true,
        })
    }
}

@Injectable
class ConfigService {
    getEnvConfig(configName: string) {
        return 'cloud'
    }
    getDbConfig(configName: string) {
        return 'console';
    }
}

interface ILogger {
    log(message: string): void
}

@Injectable
class ConsoleLoggerService implements ILogger {
    log(message: string) {
        console.log(`[console]: ${message}`);
    }
}

function getLoggerType() {
    return 'console';
}

@Injectable
class FileLoggerService implements ILogger {
    log(message: string) {
        console.log(`[file]: ${message}`);
    }
}

@Injectable
class CloudLoggerService implements ILogger {
    log(message: string) {
        console.log(`[cloud]: ${message}`);
    }
}

@Injectable
class LoggerFactory {

    @Inject(ConfigService)
    private configService!: ConfigService

    @Inject(ConsoleLoggerService)
    private consoleLogger!: ConsoleLoggerService;

    @Inject(FileLoggerService)
    private fileLogger!: FileLoggerService;

    @Inject(CloudLoggerService)
    private cloudLogger!: CloudLoggerService;

    getLogger(): ILogger {
        const config = this.configService.getEnvConfig('loggerConfig');
        switch(config) {
            case 'console':
                return this.consoleLogger
            case 'file': 
                return this.fileLogger;
            case 'cloud':
                return this.cloudLogger;
            default:
                throw new Error('unknown logger service instance');
        }
    }
}

@Injectable
class UserService {
    @Inject(LoggerFactory)
    private loggerFactory!: LoggerFactory

    private loggerService: ILogger;
    constructor() {
        this.loggerService = this.loggerFactory.getLogger()
    }
    login(username: string, password: string){
        this.loggerService.log(`logging in user with ${username} and ${password}`)
    }
    updateUserName(newUsername: string) {
        this.loggerService.log(`updating username ${newUsername}`);
    }
    logOut() {
        this.loggerService.log('logging out user');
    }
}

@Injectable
class Main {
    @Inject(UserService)
    private userService!: UserService;
    constructor() {}
    init() {
        this.userService.login('john', 'john@123');
        this.userService.updateUserName('bob');
        this.userService.logOut()
    }
}

const main = container.resolve(Main);
main.init()