export interface StapiCharacter {
  uid: string;
  name: string;
  gender?: string;
  deceased?: boolean;
  hologram?: boolean;
  fictionalCharacter?: boolean;
  mirror?: boolean;
  alternateReality?: boolean;
}

export interface CharacterDetails extends StapiCharacter {
  yearOfBirth?: number;
  monthOfBirth?: number;
  dayOfBirth?: number;
  placeOfBirth?: string;
  yearOfDeath?: number;
  monthOfDeath?: number;
  dayOfDeath?: number;
  placeOfDeath?: string;
  height?: number;
  weight?: number;
  bloodType?: string;
  maritalStatus?: string;
  serialNumber?: string;
  hologramActivationDate?: string;
  hologramStatus?: string;
  hologramDateStatus?: string;
}
