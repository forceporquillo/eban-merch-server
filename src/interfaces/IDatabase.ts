interface IDatabase {
    getProducts(): Promise<object[]>;
}

export default IDatabase;
