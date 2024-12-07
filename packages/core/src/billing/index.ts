export namespace Billing {
  export function compute(storage: number) {
    const rate = storage <= 10 ? 4 : storage <= 100 ? 2 : 1;
    return storage * rate * 100;
  }
}
