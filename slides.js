const revealOpt = require('./reveal-md.json');
const { join } = require('path');
const { readdirSync, readFileSync, createWriteStream } = require('fs');
const { unary, pipe, reject, concat, intersperse, map } = require('ramda');

const { EOL } = require('os');
const SRC_PATH = join(__dirname, './slides/');
const VERTICAL_SEPARATOR = `${EOL}${revealOpt.verticalSeparator}${EOL}`;
const SEPARATOR = `${EOL}${revealOpt.separator}${EOL}`;
const SLIDES_PATH = join(__dirname, './slides.md');

const isMdFile = name => name.includes('.md');
const folders = pipe(
    unary(readdirSync),
    reject(isMdFile)
);

const makeVerticalSliders = src => {
    const slides = readdirSync(src);
    const verticalSliders = slides
        .map(concat(src + '/'))
        .map(unary(readFileSync));

    return intersperse(VERTICAL_SEPARATOR, verticalSliders);
};

const makeSliders = (src, dest) => {
    const mainSlider = createWriteStream(dest);
    const horizontalSliders = folders(src).map(concat(src));
    const verticalSliders = map(makeVerticalSliders, horizontalSliders);

    for (const content of verticalSliders) {
        mainSlider.write(content.join(''));
        mainSlider.write(SEPARATOR);
    }

    mainSlider.end();
};

makeSliders(SRC_PATH, SLIDES_PATH);
