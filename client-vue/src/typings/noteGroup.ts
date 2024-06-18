import type { HierarchyNodeParentId } from "./hierarchyView";

export type NoteGroupParentId = HierarchyNodeParentId;

export interface NoteGroupProps {
  title: string;
  content: string;
}

export interface NoteGroupRequiredProps {
  readonly id: string;
  parentId: NoteGroupParentId;
}

export interface NoteGroup extends NoteGroupRequiredProps, NoteGroupProps {}

export interface NoteGroupCreation
  extends Partial<NoteGroupProps>,
    NoteGroupRequiredProps {}

export type NoteGroups = Array<NoteGroup>;

export interface NoteGroupDeletedAttributes {
  groups: Array<{ id: string }>;
  notes: Array<{ id: string }>;
}

/* * * Guards * * */

export const isNoteGroupDeletedAttributes = (
  res: any
): res is NoteGroupDeletedAttributes => {
  return (
    res !== null &&
    typeof res === "object" &&
    res.groups !== undefined &&
    Array.isArray(res.groups) &&
    // (res.groups.length === 0 || res.groups.every(isNoteGroupIds)) &&
    res.notes !== undefined &&
    Array.isArray(res.notes)
    // (res.notes.length === 0 || res.notes.every(isNoteIds))
  );
};

export const isNoteGroup = (noteGroup: any): noteGroup is NoteGroup => {
  return (
    noteGroup !== null &&
    typeof noteGroup === "object" &&
    typeof noteGroup.id === "string" &&
    typeof noteGroup.title === "string" &&
    typeof noteGroup.description === "string" &&
    (noteGroup.parentId === null || typeof noteGroup.parentId === "string")
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

export const isNoteGroupId = (res: any): res is Pick<NoteGroup, "id"> => {
  return res !== null && typeof res === "object" && typeof res.id === "string";
};

export const isNoteGroupIds = (
  res: any
): res is Array<Pick<NoteGroup, "id">> => {
  return (
    res !== null &&
    res !== undefined &&
    Array.isArray(res) &&
    res.every(isNoteGroupId)
  );
};
