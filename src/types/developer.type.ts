export interface IDeveloper {
    id: string;
    name: string;
    username: string;
    bio: string;
}

export interface DeveloperSkill {
    id: string;
    name: string;
    category: string;
}

export interface DeveloperTechnology {
    id: string;
    name: string;
    category: string;
    description: string;
}

export interface DeveloperProject {
    id: string;
    name: string;
    description: string;
    stars: number;
    url: string;
    company: string;
};