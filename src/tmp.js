// WIP - to be converted to vanilla JS

// default values to be displayed
defaultValue = {
  octets: [10, 88, 135, 144],
  cidr: 28
};

function handleOnChange(event) {
  var octets = this.state.octets;
  var val = +event.target.value.replace(/[^0-9]/g, '');
  var octet = event.target.attributes['data-octet'].value;
  if (octet == 'cidr') {
    if (val <= 32) {
      this.setState({
        cidr: val
      });
    }
  } else {
    if (val <= 255) {
      octets[+octet] = val;
      this.setState({
        octets: octets
      });
    }
  }
}

function handleOnKeyDown(event) {
  var lowerOctetValue = 0;
  var higherOctetValue = event.target.dataset.octet === 'cidr' ? 32 : 255;
  if (event.key === 'ArrowDown' && event.target.value > lowerOctetValue) {
    event.target.value = +event.target.value - 1;
    this.handleOnChange(event);
  }
  if (event.key === 'ArrowUp' && event.target.value < higherOctetValue) {
    event.target.value = +event.target.value + 1;
    this.handleOnChange(event);
  }
  if (event.key === '.') {
    event.preventDefault()
    var octet_input = event.target.parentNode.nextSibling.firstChild
    if (octet_input instanceof HTMLInputElement) {
      octet_input.select()
      octet_input.focus()
    }
  }
  if (event.key === '/') {
    event.preventDefault()
    var mask_input = event.target.parentNode.nextSibling
    if (mask_input instanceof HTMLInputElement) {
      mask_input.select()
      mask_input.focus()
    }
  }
}

function handleOnWheel(event) {
  var lowerOctetValue = 0;
  var higherOctetValue = event.target.dataset.octet === 'cidr' ? 32 : 255;
  if (event.deltaY > 0 && event.target.value > lowerOctetValue) {
    event.target.value = +event.target.value - 1;
    this.handleOnChange(event);
  }
  if (event.deltaY < 0 && event.target.value < higherOctetValue) {
    event.target.value = +event.target.value + 1;
    this.handleOnChange(event);
  }
}