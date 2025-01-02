export const FaceDanceCategory = {
  viralSound: "viral sound",
  viralClips: "viral clips",
  celebShorts: "celeb shorts",
  iconicSpeeches: "iconic",
  song: "songs",
  funnySounds: "funny sounds",
  reaction: "reactions",
};
export const listCategoryFaceDance = [
  {
    id: FaceDanceCategory.viralSound,
    name: FaceDanceCategory.viralSound,
  },
  {
    id: FaceDanceCategory.viralClips,
    name: FaceDanceCategory.viralClips,
  },
  {
    id: FaceDanceCategory.celebShorts,
    name: FaceDanceCategory.celebShorts,
  },
  {
    id: FaceDanceCategory.iconicSpeeches,
    name: FaceDanceCategory.iconicSpeeches,
  },
  {
    id: FaceDanceCategory.song,
    name: FaceDanceCategory.song,
  },
  {
    id: FaceDanceCategory.reaction,
    name: FaceDanceCategory.reaction,
  },
  {
    id: FaceDanceCategory.funnySounds,
    name: FaceDanceCategory.funnySounds,
  },
];
export const dataFaceDance = [];

const categories = [
  { range: [1, 94], name: "viral sound" },
  { range: [95, 130], name: "viral clips" },
  { range: [131, 170], name: "songs" },
  { range: [171, 181], name: "reactions" },
  { range: [182, 187], name: "iconic" },
  { range: [188, 195], name: "funny sounds" },
  { range: [196, 228], name: "celeb shorts" },
];

for (let i = 1; i <= 228; i++) {
  let category = "";
  for (const { range, name } of categories) {
    if (i >= range[0] && i <= range[1]) {
      category = name;
      break;
    }
  }

  dataFaceDance.push({
    id: i,
    category: category,
    videoUrl: require(`../../assets/video/face_dance/video/${i}.mp4`),
    thumbnail: require(`../../assets/video/face_dance/thumbnail/${i}.webp`),
  });
}
