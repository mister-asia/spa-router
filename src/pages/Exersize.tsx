import { useCallback, useEffect, useRef, useState } from "react";

type User = {
  id: number;
  name: string;
};

const users = [
  { id: 1, name: "Alice Johnson" },
  { id: 2, name: "Bob Smith" },
  { id: 3, name: "Charlie Brown" },
  { id: 4, name: "Diana Prince" },
  { id: 5, name: "Edward Norton" },
  { id: 6, name: "Fiona Apple" },
  { id: 7, name: "George Wilson" },
  { id: 8, name: "Hannah Montana" },
  { id: 9, name: "Isaac Newton" },
  { id: 10, name: "Julia Roberts" },
  { id: 11, name: "Kevin Hart" },
  { id: 12, name: "Laura Palmer" },
  { id: 13, name: "Michael Scott" },
  { id: 14, name: "Nancy Drew" },
  { id: 15, name: "Oliver Twist" },
  { id: 16, name: "Patricia Moore" },
  { id: 17, name: "Quincy Jones" },
  { id: 18, name: "Rachel Green" },
  { id: 19, name: "Samuel Adams" },
  { id: 20, name: "Tina Turner" },
  { id: 21, name: "Ulysses Grant" },
  { id: 22, name: "Victoria Secret" },
  { id: 23, name: "Walter White" },
  { id: 24, name: "Xena Warrior" },
  { id: 25, name: "Yolanda King" },
  { id: 26, name: "Zachary Taylor" },
  { id: 27, name: "Amanda Bynes" },
  { id: 28, name: "Benjamin Franklin" },
  { id: 29, name: "Catherine Zeta" },
  { id: 30, name: "David Beckham" },
  { id: 31, name: "Emma Watson" },
  { id: 32, name: "Frank Sinatra" },
  { id: 33, name: "Grace Kelly" },
  { id: 34, name: "Henry Ford" },
  { id: 35, name: "Iris West" },
  { id: 36, name: "James Bond" },
  { id: 37, name: "Katherine Pierce" },
  { id: 38, name: "Leonard Cohen" },
  { id: 39, name: "Monica Geller" },
  { id: 40, name: "Nathan Drake" },
  { id: 41, name: "Olivia Pope" },
  { id: 42, name: "Peter Parker" },
  { id: 43, name: "Quinn Fabray" },
  { id: 44, name: "Ryan Reynolds" },
  { id: 45, name: "Sophia Loren" },
  { id: 46, name: "Thomas Edison" },
  { id: 47, name: "Uma Thurman" },
  { id: 48, name: "Vincent Vega" },
  { id: 49, name: "Wendy Williams" },
  { id: 50, name: "Xavier Woods" },
  { id: 51, name: "Yvonne Strahovski" },
  { id: 52, name: "Zoe Saldana" },
  { id: 53, name: "Aaron Paul" },
  { id: 54, name: "Bella Swan" },
  { id: 55, name: "Chris Evans" },
  { id: 56, name: "Daisy Ridley" },
  { id: 57, name: "Ethan Hunt" },
  { id: 58, name: "Felicity Jones" },
  { id: 59, name: "Gal Gadot" },
  { id: 60, name: "Harrison Ford" },
  { id: 61, name: "Isla Fisher" },
  { id: 62, name: "Jake Gyllenhaal" },
  { id: 63, name: "Kate Winslet" },
  { id: 64, name: "Liam Neeson" },
  { id: 65, name: "Margot Robbie" },
  { id: 66, name: "Natalie Portman" },
  { id: 67, name: "Oscar Isaac" },
  { id: 68, name: "Penelope Cruz" },
  { id: 69, name: "Quentin Tarantino" },
  { id: 70, name: "Reese Witherspoon" },
  { id: 71, name: "Scarlett Johansson" },
  { id: 72, name: "Tom Hanks" },
  { id: 73, name: "Ursula Andress" },
  { id: 74, name: "Vin Diesel" },
  { id: 75, name: "Will Smith" },
  { id: 76, name: "Xander Harris" },
  { id: 77, name: "Yasmine Bleeth" },
  { id: 78, name: "Zack Snyder" },
  { id: 79, name: "Anthony Hopkins" },
  { id: 80, name: "Brenda Walsh" },
  { id: 81, name: "Cillian Murphy" },
  { id: 82, name: "Denzel Washington" },
  { id: 83, name: "Eva Green" },
  { id: 84, name: "Florence Pugh" },
  { id: 85, name: "Gary Oldman" },
  { id: 86, name: "Helen Mirren" },
];

const Car = {
  name: "Toyota",
  setName(name: string) {
    this.name = name;
  },
};

const ProtectedCar = new Proxy(Car, {
  set(target, prop, value) {
    if (!value) {
      throw new Error("Name is required");
    }
    return Reflect.set(target, prop, value);
  },
});

try {
  ProtectedCar.setName("");
} catch (error) {
  console.error(error);
}
console.log(ProtectedCar.name);

async function* fetchUsersGenerator(limit: number): AsyncGenerator<User[]> {
  let start = 0;

  while (start < users.length) {
    const usersPart = await new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve(users.slice(start, start + limit));
      }, 500);
    });

    if (usersPart.length === 0) break;

    yield usersPart;
    start += limit;
  }
}

const Exersize = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const generatorRef = useRef<AsyncGenerator<User[]> | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const LIMIT = 10;

  const loadMoreUsers = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      if (!generatorRef.current) {
        generatorRef.current = fetchUsersGenerator(LIMIT);
      }

      const { value, done } = await generatorRef.current.next();

      if (done || !value || value.length === 0) {
        setHasMore(false);
      } else {
        setUsersList((prev) => [...prev, ...value]);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setHasMore(false);
    }

    setLoading(false);
  }, [loading, hasMore, LIMIT]);

  useEffect(() => {
    loadMoreUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreUsers();
        }
      },
      { threshold: 1.0 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreUsers, hasMore, loading]);

  return (
    <div>
      <h2>Lazy Scroll Users</h2>
      <div
        style={{
          height: "500px",
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <ol>
          {usersList.map((user) => (
            <li key={user.id} style={{ padding: "8px 0" }}>
              {user.name}
            </li>
          ))}
        </ol>

        <div ref={observerTarget} style={{ height: "20px", margin: "10px 0" }}>
          {loading && <p>Загрузка...</p>}
          {!hasMore && <p>Все пользователи загружены</p>}
        </div>
      </div>
    </div>
  );
};

export default Exersize;
