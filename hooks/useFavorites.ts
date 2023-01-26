import { useEffect, useState } from "react";

async function toggleFavoriteTeamLocalStorage(
  teamId: number
): Promise<number[]> {
  const currentFavorites = JSON.parse(
    window.localStorage.getItem("favoriteTeams") || "[]"
  );

  if (currentFavorites.includes(teamId)) {
    const updatedFavorites = currentFavorites.filter(
      (fav: number) => fav !== teamId
    );
    await window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(updatedFavorites)
    );
    return updatedFavorites;
  } else {
    currentFavorites.push(teamId);
    window.localStorage.setItem(
      "favoriteTeams",
      JSON.stringify(currentFavorites)
    );
    return currentFavorites;
  }
}

function getFavoriteTeamsLocalStorage() {
  return (
    typeof window !== "undefined" &&
    JSON.parse(window.localStorage.getItem("favoriteTeams") || "[]")
  );
}

export function useFavorites(): [
  (teamId: number) => void,
  { favorites: number[] }
] {
  const [favorites, setFavorites] = useState<number[]>(
    getFavoriteTeamsLocalStorage()
  );

  const toggleFavorite = async (teamId: number) => {
    if (favorites.includes(teamId)) {
      const newFavorites = await toggleFavoriteTeamLocalStorage(teamId);
      setFavorites([...newFavorites]);
    } else {
      const newFavorites = await toggleFavoriteTeamLocalStorage(teamId);
      setFavorites([...newFavorites]);
    }
  };

  useEffect(() => {
    setFavorites(getFavoriteTeamsLocalStorage());
  }, []);

  return [toggleFavorite, { favorites }];
}
