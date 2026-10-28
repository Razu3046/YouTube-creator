import { SavedProject, UserProfile, VideoScriptInput, GenerationResults, Platform } from '../types';

const STORAGE_KEY_USER = 'ai_video_seo_current_user';
const STORAGE_KEY_USERS_DB = 'ai_video_seo_users_list';
const STORAGE_KEY_PROJECTS = 'ai_video_seo_projects_list';

export const storageService = {
  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      return data ? JSON.parse(data) : {
        id: 'guest_user',
        email: 'creator@local.workspace',
        displayName: 'Guest Creator',
        createdAt: Date.now()
      };
    } catch {
      return null;
    }
  },

  setCurrentUser(user: UserProfile | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  },

  register(email: string, displayName: string, _password: string): UserProfile {
    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: email.trim().toLowerCase(),
      displayName: displayName.trim() || 'Creator',
      createdAt: Date.now()
    };
    try {
      const usersRaw = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const users: UserProfile[] = usersRaw ? JSON.parse(usersRaw) : [];
      users.push(newUser);
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
      this.setCurrentUser(newUser);
    } catch (e) {
      console.warn('Storage warning', e);
    }
    return newUser;
  },

  login(email: string, _password: string): UserProfile {
    try {
      const usersRaw = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const users: UserProfile[] = usersRaw ? JSON.parse(usersRaw) : [];
      const found = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (found) {
        this.setCurrentUser(found);
        return found;
      }
    } catch (e) {
      console.warn('Storage warning', e);
    }
    // If not found in mock DB, create session with this email
    const fallbackUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: email.trim().toLowerCase(),
      displayName: email.split('@')[0],
      createdAt: Date.now()
    };
    this.setCurrentUser(fallbackUser);
    return fallbackUser;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY_USER);
  },

  getSavedProjects(platformFilter?: Platform): SavedProject[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
      const all: SavedProject[] = raw ? JSON.parse(raw) : [];
      const user = this.getCurrentUser();
      const userProjects = all.filter(p => !p.id.startsWith('other_') || (user && user.id === 'guest_user'));
      if (platformFilter) {
        return userProjects.filter(p => p.platform === platformFilter);
      }
      return userProjects.sort((a, b) => b.updatedAt - a.updatedAt);
    } catch {
      return [];
    }
  },

  saveProject(platform: Platform, name: string, input: VideoScriptInput, results: GenerationResults): SavedProject {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    const all: SavedProject[] = raw ? JSON.parse(raw) : [];
    
    const newProject: SavedProject = {
      id: 'proj_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
      name: name || `${platform.toUpperCase()} - ${input.topic || input.script.substring(0, 30)}...`,
      platform,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      input,
      results
    };

    all.unshift(newProject);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(all));
    return newProject;
  },

  deleteProject(id: string): boolean {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (!raw) return false;
      const all: SavedProject[] = JSON.parse(raw);
      const filtered = all.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  },

  exportProjectsJson(): string {
    const projects = this.getSavedProjects();
    return JSON.stringify(projects, null, 2);
  },

  importProjectsJson(jsonString: string): number {
    try {
      const imported: SavedProject[] = JSON.parse(jsonString);
      if (!Array.isArray(imported)) return 0;
      const current = this.getSavedProjects();
      const existingIds = new Set(current.map(p => p.id));
      let added = 0;
      for (const p of imported) {
        if (p.id && p.platform && p.input && !existingIds.has(p.id)) {
          current.push(p);
          added++;
        }
      }
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(current));
      return added;
    } catch {
      return 0;
    }
  }
};
