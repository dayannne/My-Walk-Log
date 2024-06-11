export const filterPlacesByKeyword = (places: any[], keywords: string[]) => {
  return places.filter((place) => {
    const categories = place.category_name.split(` > `);
    return keywords.some((keyword) => categories.includes(keyword));
  });
};
