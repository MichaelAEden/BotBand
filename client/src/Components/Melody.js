import React, { Component } from "react";
import _ from "lodash";

import { NOTE_LOWEST, NOTE_HIGHEST } from "../Utils/melody";
import "./styles/Melody.css";

// Relates notes in an octave to a colour, starting with A.
const NOTE_COLOURS = [
  "#37d8de", // Teal
  "#3796de", // Blue
  "purple",
  "red",
  "orange",
  "#ded037", // Yellow
  "green",
];

class Melody extends Component {
  render() {
    // Check for notes outside acceptable range.
    const notesInvalid = this.props.melody.notes
      .map((note) => note.code)
      .filter((code) => code < NOTE_LOWEST || code > NOTE_HIGHEST);
    if (notesInvalid.length > 0) throw new Error(`Notes out of range: ${notesInvalid.join(", ")}`);

    const melodyLength = this.props.melody.notes.length;
    const noteRange = NOTE_HIGHEST - NOTE_LOWEST;

    const getColourFromNote = (note) => NOTE_COLOURS[note.code % 7];

    // Create table row-by-row, populating cells with notes as necessary.
    return (
      <table className="melody">
        <tbody>
          {_.times(noteRange, (note) => (
            <tr key={note}>
              {_.times(melodyLength, (time) => (
                // '(noteRange - note)' is used to invert the table.
                <td
                  key={time}
                  style={{
                    background:
                      this.props.melody.notes[time].code - NOTE_LOWEST === noteRange - note - 1
                        ? getColourFromNote(this.props.melody.notes[time])
                        : "white",
                  }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Melody;
