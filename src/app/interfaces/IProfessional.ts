export interface ILocation { // para las cordenadas
    latitude: number;
    longitude: number;
}


export interface IProfessional {
    id: string;
    name: string;
    lastname: string;
    dni: string;
    phone: string;
    license: string;
    specialty: 'veterinario' | 'peluqueria' | 'veterinario y peluqueria';
    biography: string;
    nameEstablishment: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    province: string;
    postalCode: string;
    location: ILocation;
    imagesUrl: string[];
    email: string;
    password: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IProfessionalData extends Pick<
    IProfessional,
    'name' | 'lastname' | 'dni' | 'email' | 'phone' | 'password' | 'license' | 'specialty' | 'nameEstablishment'
> {
}