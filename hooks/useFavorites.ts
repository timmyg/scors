import { useLocalStorage } from "hooks/useLocalStorage";

function toggleFavoriteTeam(teamId: number) {
  const currentFavorites = JSON.parse(
    window.localStorage.getItem("favoriteTeams") || "[]"
  );
  if (!currentFavorites.includes(teamId)) {
    currentFavorites.push(teamId);
    window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(currentFavorites)
    );
  }
}

function unfavoriteTeam(teamId: number) {
  const currentFavorites = JSON.parse(
    window.localStorage.getItem("favoriteTeams") || "[]"
  );
  const updatedFavorites = currentFavorites.filter(
    (fav: number) => fav !== teamId
  );
  window.localStorage.setItem(
    "favoriteTeams",
    JSON.stringify(updatedFavorites)
  );
}

export function getFavoriteTeams() {
  return JSON.parse(window.localStorage.getItem("favoriteTeams") || "[]");
}

export function useFavoritedTeams(): [
  number[],
  (teamId: number) => void
  //   (teamId: number) => void
] {
  const [favorites, setFavorites] = useLocalStorage("favoriteTeams", []);

  const toggleFavorite = (teamId: number) => {
    if (favorites.includes(teamId)) {
      setFavorites(favorites.filter((fav: number) => fav !== teamId));
      unfavoriteTeam(teamId);
    } else {
      setFavorites([...favorites, teamId]);
      toggleFavoriteTeam(teamId);
    }
  };
  //   const unfavorite = (teamId: number) => {
  //     setFavorites(favorites.filter((fav: number) => fav !== teamId));
  //     unfavoriteTeam(teamId);
  //   };

  return [
    favorites,
    toggleFavorite,
    // unfavorite
  ];
}
