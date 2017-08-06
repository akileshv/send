const bytes = require('bytes');
const $ = require('jquery');
require('jquery-circle-progress');

let $progress = null;
let $percent = null;
let $text = null;

document.addEventListener('DOMContentLoaded', function() {
  $percent = $('.percent-number');
  $text = $('.progress-text');
  $progress = $('.progress-bar');
  $progress.circleProgress({
    value: 0.0,
    startAngle: -Math.PI / 2,
    fill: '#3B9DFF',
    size: 158,
    animation: { duration: 300 }
  });
});

function setProgress(params) {
  const percent = params.complete / params.total;
  $progress.circleProgress('value', percent);
  $percent.text(`${Math.floor(percent * 100)}`);
  document.l10n
    .formatValue('fileSizeProgress', {
      partialSize: bytes(params.complete, {
        decimalPlaces: 1,
        fixedDecimals: true
      }),
      totalSize: bytes(params.total, { decimalPlaces: 1 })
    })
    .then(setText);
}

function setText(str) {
  $text.text(str);
}

module.exports = {
  setProgress,
  setText
};
