export class UserUtil {
    static get(): any {
        const data = localStorage.getItem('agenda.user');
        if (!data) return null;
        return JSON.parse(data);
    }

    static set(data) {
        localStorage.setItem('agenda.user', JSON.stringify(data));
    }

    static clear() {
        localStorage.removeItem('agenda.user');
    }
}