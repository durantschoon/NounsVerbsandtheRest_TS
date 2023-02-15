import { AuthorName, Line, Title } from "src/type-definitions";
import poems, {
  defaultAuthorName as dAuthorName,
  defaultTitle as dTitle,
  defaultPoemLines as dLines,
} from "../data/poems";

export default class Poem {
  author: AuthorName;
  title: Title;
  lines: Line[];
  constructor(author: AuthorName, title: Title, lines: Line[]) {
    this.author = author;
    this.title = title;
    this.lines = lines;
  }
}

export const defaultPoem = new Poem(dAuthorName, dTitle, dLines);
