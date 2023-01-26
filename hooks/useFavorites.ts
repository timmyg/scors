import { useLocalStorage } from "hooks/useLocalStorage";
import { useState } from "react";

function toggleFavoriteTeamLocalStorage(teamId: number): number[] {
  const currentFavorites = JSON.parse(
    window.localStorage.getItem("favoriteTeams") || "[]"
  );

  if (currentFavorites.includes(teamId)) {
    console.log("un");
    const updatedFavorites = currentFavorites.filter(
      (fav: number) => fav !== teamId
    );
    console.log({ updatedFavorites });
    window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(updatedFavorites)
    );
  } else {
    console.log("add");
    currentFavorites.push(teamId);
    window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(currentFavorites)
    );
  }
  return currentFavorites;
}

export function getFavoriteTeams() {
  return (
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem("favoriteTeams") || "[]")
  );
}

export function useFavorites(): [
  number[],
  (teamId: number) => void
  //   (teamId: number) => void
] {
  // const [favorites, setFavorites] = useLocalStorage("favoriteTeams", []);
  const [favorites, setFavorites] = useState<number[]>(getFavoriteTeams());

  const toggleFavorite = (teamId: number) => {
    if (favorites.includes(teamId)) {
      const newFavorites = toggleFavoriteTeamLocalStorage(teamId);
      console.log("un", { newFavorites });
      setFavorites([...newFavorites]);
    } else {
      const newFavorites = toggleFavoriteTeamLocalStorage(teamId);
      // console.log("add", { newFavorites });
      // setFavorites(newFavorites);
    }
  };

  return [favorites, toggleFavorite];
}
