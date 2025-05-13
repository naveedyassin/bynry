export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  latitude: number;
  longitude: number;
  contact?: string;
  interests?: string[];
}

let profiles: Profile[] = [
  {
    id: '1',
    name: 'Alice Smith',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    description: 'Frontend Developer from NY',
    latitude: 40.7128,
    longitude: -74.0060,
    contact: 'alice@example.com',
    interests: ['React', 'UI/UX'],
  },
  {
    id: '2',
    name: 'Bob Johnson',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    description: 'Backend Engineer from SF',
    latitude: 37.7749,
    longitude: -122.4194,
    contact: 'bob@example.com',
    interests: ['Node.js', 'APIs'],
  },
];

export async function getProfiles(): Promise<Profile[]> {
  return new Promise(resolve => setTimeout(() => resolve([...profiles]), 300));
}

export async function getProfileById(id: string): Promise<Profile | undefined> {
  return new Promise(resolve => setTimeout(() => resolve(profiles.find(p => p.id === id)), 200));
}

export async function addProfile(profile: Profile): Promise<void> {
  return new Promise(resolve => {
    profiles.push(profile);
    setTimeout(resolve, 200);
  });
}

export async function updateProfile(id: string, updated: Partial<Profile>): Promise<void> {
  return new Promise(resolve => {
    profiles = profiles.map(p => (p.id === id ? { ...p, ...updated } : p));
    setTimeout(resolve, 200);
  });
}

export async function deleteProfile(id: string): Promise<void> {
  return new Promise(resolve => {
    profiles = profiles.filter(p => p.id !== id);
    setTimeout(resolve, 200);
  });
}
