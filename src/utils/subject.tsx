type UnSubscribe = () => void;
type Subscription = { unSubscribe: UnSubscribe };
type Handler<T> = (value: T) => void;
type Next<T> = (value: T) => void;
type Subscribe<T> = (handler: Handler<T>) => Subscription;

export type Observable<T = void> = {
  subscribe: Subscribe<T>;
};

export type Subject<T = void> = {
  next: Next<T>;
  asObservable: () => Observable<T>;
};

export const createSubject: <T>() => Subject<
  T extends NonNullable<unknown> ? T : void
> = <T,>() => {
  const handlers: { [key: string]: Handler<T> } = {};
  let nextSubscriptionIndex = 0;
  const subscribe: Subscribe<T> = (onNext) => {
    const subId = `${nextSubscriptionIndex}`;
    nextSubscriptionIndex++;
    handlers[subId] = onNext;
    const unSubscribe: UnSubscribe = () => {
      delete handlers[subId];
    };
    return { unSubscribe };
  };

  const next: Next<T> = (value: T) => {
    Object.values(handlers).forEach((handler) => {
      handler(value);
    });
  };

  const asObservable: () => Observable<T> = () => ({
    subscribe,
  });

  return {
    next,
    asObservable,
  };
};
