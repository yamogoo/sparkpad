import type { EncodedNodePath } from "./hierarchyTree";

export interface NoteGroup {
  id: number;
  uid: string;
  path: EncodedNodePath;
  title: string;
  description: string;
}

export type NoteGroupCreation = Pick<
  NoteGroup,
  "id" | "uid" | "title" | "path" | "description"
>;

export type NoteGroups = Array<NoteGroup>;

/* * * Guards * * */

export const isNoteGroup = (noteGroup: any): noteGroup is NoteGroup => {
  return (
    noteGroup !== null &&
    typeof noteGroup === "object" &&
    typeof noteGroup.id === "number" &&
    typeof noteGroup.uid === "string" &&
    typeof noteGroup.path === "string" &&
    typeof noteGroup.title === "string" &&
    typeof noteGroup.description === "string"
  );
};

export const isNoteGroups = (noteGroups: any): noteGroups is NoteGroups => {
  return (
    noteGroups !== null &&
    typeof noteGroups === "object" &&
    Array.isArray(noteGroups) &&
    noteGroups.every(isNoteGroup)
  );
};

export const isNoteGroupUid = (res: any): res is Pick<NoteGroup, "uid"> => {
  return res !== null && typeof res === "object" && typeof res.uid === "string";
};
