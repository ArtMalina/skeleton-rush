const MSG_NAME = Symbol('MSG');

const reactive = {
    [MSG_NAME]: [] as string[],
    get messages() {
        return this[MSG_NAME];
    },
    _subscribers: new Map() as Map<string, (v?: any) => {}>,
    track(cb: any, subscriptionName: string) {
        this._subscribers.set(subscriptionName, cb);
    },
    send(msg: string) {
        this[MSG_NAME].unshift(msg);
        this._subscribers.forEach(cb => cb(msg))
    },
    unsubscribe(subscriptionName: string) {
        this._subscribers.delete(subscriptionName);
    }
}

export default reactive;