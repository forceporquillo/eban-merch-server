import IProduct from './IProduct';
import IUser from './IUser';

interface IDatabase {
    getProducts(): Promise<IProduct[]>;
    getProduct(id: string): Promise<IProduct>;
    postUser(user: IUser): Promise<number>;
    loginUser(email: string, password: string): Promise<number>;
    getUserById(id: number): Promise<IUser>;

    // helper funcs
    emailExists(email: string): Promise<boolean>;
    contactExists(contact: string): Promise<boolean>;

    // TODO: remove test database func
    mockGetAll(): Promise<object[]>;
}

export default IDatabase;
