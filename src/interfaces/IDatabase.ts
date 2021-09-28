interface IDatabase {
    getProducts(): Promise<object[]>;
    // TODO: remove test database func
    mockGetAll(): Promise<object[]>;
    getProduct(id: string): Promise<object>;
}

export default IDatabase;
