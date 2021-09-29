import IProduct from './IProduct';

interface IDatabase {
    getProducts(): Promise<IProduct[]>;
    // TODO: remove test database func
    mockGetAll(): Promise<object[]>;
    getProduct(id: string): Promise<IProduct>;
}

export default IDatabase;
