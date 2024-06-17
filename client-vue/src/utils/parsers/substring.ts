import type {
  SearchedSubstringItem,
  SubstrIndex,
  SubstrIndexes,
} from "@/typings";

/**
 * @description Find substring start and end indexes
 */
export const findSubstrIdxs = (str: string, substr: string): SubstrIndex => {
  const start = str.indexOf(substr);
  const end = start !== -1 ? substr.length + start - 1 : -1;
  return { start, end };
};

/**
 * @description Find all substring start and end indexes
 */
export const findAllSubstrIdxs = (
  str: string,
  substr: string
): SubstrIndexes => {
  const idxs: SubstrIndexes = [];
  let start = str.indexOf(substr);

  while (start !== -1) {
    const end = start + substr.length - 1;
    idxs.push({ end, start });

    start = str.indexOf(substr, start + 1);
  }

  return idxs;
};

/**
 * @description Find all segments
 */

export const findAllSegments = (
  str: string,
  searchedPhrase: string,
  isCaseInsensitive = false
) => {
  const idxs = findAllSubstrIdxs(
    isCaseInsensitive ? str.toLowerCase() : str,
    isCaseInsensitive ? searchedPhrase.toLowerCase() : searchedPhrase
  );

  const segments: Array<SearchedSubstringItem> = [];
  let sIdx = 0;

  idxs.forEach((idx) => {
    const { start, end } = idx;

    if (sIdx < start)
      segments.push({
        value: str.substring(sIdx, start),
        position: { start: sIdx, end: start - 1 },
      });

    segments.push({
      value: str.substring(start, end + 1),
      position: { start, end: end },
      match: searchedPhrase,
    });

    sIdx = end + 1;
  });

  if (sIdx < str.length)
    segments.push({
      value: str.substring(sIdx),
      position: { start: sIdx, end: str.length - 1 },
    });

  return segments;
};
