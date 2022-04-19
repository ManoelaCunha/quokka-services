interface ICondominium {
    condominiumId: string;
    condominiumName: string;
    zipCode: string;
    district: string;
    street: string;
    number: number;
    trusteeName: string;
    trusteeEmail: string;
    trusteeCpf: string;
    trusteePassword: string;
}

interface ICondominiumRepository {
    saveCondominium(condominium: ICondominium): Promise<ICondominium>;
    findCondominium(): Promise<ICondominium[]>;
    findCondominiumById(condominium_id: string): Promise<ICondominium>;
    findByEmail(condominium_email: string): Promise<ICondominium>;
    updateCondominium(condominium: ICondominium): Promise<ICondominium>;
    deleteCondominium(condominium_id: string): Promise<void>;
}

export { ICondominium, ICondominiumRepository };
