export namespace storage {
    export function get(key: string): any {
          try {
              const serialized = localStorage.getItem(key);
              if (serialized === null) {
                  return undefined;
              }
              return JSON.parse(serialized);
          } catch (err) {
              return undefined;
          }
    }

    export function set(key: string, value: any): void {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
        } catch (err) {
        }
    }

    export function clear(): void {
        try {
            localStorage.clear();
        } catch (err) {
        }
    }
}
