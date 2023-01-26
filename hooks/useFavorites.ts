import { useLocalStorage } from "hooks/useLocalStorage";

function toggleFavoriteTeamLocalStorage(teamId: number) {
  const currentFavorites = JSON.parse(
    window.localStorage.getItem("favoriteTeams") || "[]"
  );
  if (currentFavorites.includes(teamId)) {
    const updatedFavorites = currentFavorites.filter(
      (fav: number) => fav !== teamId
    );
    window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(updatedFavorites)
    );
  } else {
    currentFavorites.push(teamId);
    window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(currentFavorites)
    );
  }
}

export function getFavoriteTeams() {
  return JSON.parse(window.localStorage.getItem("favoriteTeams") || "[]");
}

export function useFavorites(): [
  number[],
  (teamId: number) => void
  //   (teamId: number) => void
] {
  const [favorites, setFavorites] = useLocalStorage("favoriteTeams", []);

  const toggleFavorite = (teamId: number) => {
    if (favorites.includes(teamId)) {
      setFavorites(favorites.filter((fav: number) => fav !== teamId));
      toggleFavoriteTeamLocalStorage(teamId);
    } else {
      setFavorites([...favorites, teamId]);
      toggleFavoriteTeamLocalStorage(teamId);
    }
  };

  return [favorites, toggleFavorite];
}
