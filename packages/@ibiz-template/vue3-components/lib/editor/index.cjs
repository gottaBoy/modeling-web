'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@ibiz-template/runtime');
var vue = require('vue');
var notSupportedEditor = require('./not-supported-editor/not-supported-editor.cjs');
require('./span/index.cjs');
require('./text-box/index.cjs');
require('./dropdown-list/index.cjs');
require('./check-box/index.cjs');
require('./check-box-list/index.cjs');
require('./radio-button-list/index.cjs');
require('./date-picker/index.cjs');
require('./raw/index.cjs');
require('./stepper/index.cjs');
require('./rate/index.cjs');
require('./switch/index.cjs');
require('./slider/index.cjs');
require('./list-box/index.cjs');
require('./autocomplete/index.cjs');
require('./upload/index.cjs');
require('./data-picker/index.cjs');
require('./number-range/index.cjs');
require('./date-range/index.cjs');
require('./code/index.cjs');
require('./html/index.cjs');
require('./markdown/index.cjs');
require('./array/index.cjs');
require('./cascader/index.cjs');
require('./color-picker/index.cjs');
require('./preset/index.cjs');
require('./carousel/index.cjs');
require('./user/ibiz-searchcond-edit/index.cjs');
require('./date-range-select/index.cjs');
var ibizImageCropping = require('./upload/ibiz-image-cropping/ibiz-image-cropping.cjs');
var span = require('./span/span/span.cjs');
var spanLink = require('./span/span-link/span-link.cjs');
var input = require('./text-box/input/input.cjs');
var ibizInputNumber = require('./text-box/ibiz-input-number/ibiz-input-number.cjs');
var ibizInputIp = require('./text-box/ibiz-input-ip/ibiz-input-ip.cjs');
var ibizDropdown = require('./dropdown-list/ibiz-dropdown/ibiz-dropdown.cjs');
var ibizEmojiPicker = require('./dropdown-list/ibiz-emoji-picker/ibiz-emoji-picker.cjs');
var ibizCheckbox = require('./check-box/ibiz-checkbox/ibiz-checkbox.cjs');
var ibizCheckboxList = require('./check-box-list/ibiz-checkbox-list/ibiz-checkbox-list.cjs');
var ibizRadio = require('./radio-button-list/ibiz-radio/ibiz-radio.cjs');
var ibizDatePicker = require('./date-picker/ibiz-date-picker/ibiz-date-picker.cjs');
var ibizRaw = require('./raw/ibiz-raw/ibiz-raw.cjs');
var ibizStepper = require('./stepper/ibiz-stepper/ibiz-stepper.cjs');
var ibizRate = require('./rate/ibiz-rate/ibiz-rate.cjs');
var ibizSwitch = require('./switch/ibiz-switch/ibiz-switch.cjs');
var ibizSlider = require('./slider/ibiz-slider/ibiz-slider.cjs');
var ibizListBox = require('./list-box/ibiz-list-box/ibiz-list-box.cjs');
var ibizAutocomplete = require('./autocomplete/ibiz-autocomplete/ibiz-autocomplete.cjs');
var ibizFileUpload = require('./upload/ibiz-file-upload/ibiz-file-upload.cjs');
var ibizImagePreview = require('./upload/ibiz-image-preview/ibiz-image-preview.cjs');
var ibizImageUpload = require('./upload/ibiz-image-upload/ibiz-image-upload.cjs');
var ibizPicker = require('./data-picker/ibiz-picker/ibiz-picker.cjs');
var ibizMpicker = require('./data-picker/ibiz-mpicker/ibiz-mpicker.cjs');
var ibizPickerDropdown = require('./data-picker/ibiz-picker-dropdown/ibiz-picker-dropdown.cjs');
var ibizPickerLink = require('./data-picker/ibiz-picker-link/ibiz-picker-link.cjs');
var ibizPickerEmbedView = require('./data-picker/ibiz-picker-embed-view/ibiz-picker-embed-view.cjs');
var ibizPickerSelectView = require('./data-picker/ibiz-picker-select-view/ibiz-picker-select-view.cjs');
var ibizNumberRangePicker = require('./number-range/ibiz-number-range-picker/ibiz-number-range-picker.cjs');
var ibizDateRangePicker = require('./date-range/ibiz-date-range-picker/ibiz-date-range-picker.cjs');
var monacoEditor = require('./code/monaco-editor/monaco-editor.cjs');
var ibizArray = require('./array/ibiz-array/ibiz-array.cjs');
var ibizCascader = require('./cascader/ibiz-cascader/ibiz-cascader.cjs');
var ibizColorPicker = require('./color-picker/ibiz-color-picker/ibiz-color-picker.cjs');
var ibizPresetRawitem = require('./preset/preset-rawitem/ibiz-preset-rawitem/ibiz-preset-rawitem.cjs');
var ibizSearchcondEdit = require('./user/ibiz-searchcond-edit/ibiz-searchcond-edit.cjs');
var ibizCarousel = require('./carousel/ibiz-carousel/ibiz-carousel.cjs');
var dateRangeSelect = require('./date-range-select/date-range-select-picker/date-range-select.cjs');
var ibizVirtualizedList = require('./dropdown-list/ibiz-virtualized-list/ibiz-virtualized-list.cjs');
var spanEditor_provider = require('./span/span-editor.provider.cjs');
var textBoxEditor_provider = require('./text-box/text-box-editor.provider.cjs');
var dropdownListEditor_provider = require('./dropdown-list/dropdown-list-editor.provider.cjs');
var checkBoxEditor_provider = require('./check-box/check-box-editor.provider.cjs');
var checkboxListEditor_provider = require('./check-box-list/checkbox-list-editor.provider.cjs');
var radioButtonList_provider = require('./radio-button-list/radio-button-list.provider.cjs');
var datePickerEditor_provider = require('./date-picker/date-picker-editor.provider.cjs');
var dateRangeSelect_provider = require('./date-range-select/date-range-select.provider.cjs');
var uploadEditor_provider = require('./upload/upload-editor.provider.cjs');
var rawEditor_provider = require('./raw/raw-editor.provider.cjs');
var stepperEditor_provider = require('./stepper/stepper-editor.provider.cjs');
var rateEditor_provider = require('./rate/rate-editor.provider.cjs');
var sliderEditor_provider = require('./slider/slider-editor.provider.cjs');
var switchEditor_provider = require('./switch/switch-editor.provider.cjs');
var listBoxEditor_provider = require('./list-box/list-box-editor.provider.cjs');
var autocompleteEditor_provider = require('./autocomplete/autocomplete-editor.provider.cjs');
var pickerEditor_provider = require('./data-picker/picker-editor.provider.cjs');
var numberRangeEditor_provider = require('./number-range/number-range-editor.provider.cjs');
var dateRangeEditor_provider = require('./date-range/date-range-editor.provider.cjs');
var codeEditor_provider = require('./code/code-editor.provider.cjs');
var htmlEditor_provider = require('./html/html-editor.provider.cjs');
var markdownEditor_provider = require('./markdown/markdown-editor.provider.cjs');
var arrayEditor_provider = require('./array/array-editor.provider.cjs');
var cascaderEditor_provider = require('./cascader/cascader-editor.provider.cjs');
var colorPickerEditor_provider = require('./color-picker/color-picker-editor.provider.cjs');
var ibizSearchcondEdit_provider = require('./user/ibiz-searchcond-edit/ibiz-searchcond-edit.provider.cjs');
var carouselEditor_provider = require('./carousel/carousel-editor.provider.cjs');

"use strict";
const IBizEditor = {
  install: (v) => {
    v.component(ibizImageCropping.IBizImageCropping.name, ibizImageCropping.IBizImageCropping);
    v.component(notSupportedEditor.NotSupportedEditor.name, notSupportedEditor.NotSupportedEditor);
    v.component(span.IBizSpan.name, span.IBizSpan);
    v.component(spanLink.IBizSpanLink.name, spanLink.IBizSpanLink);
    v.component(input.IBizInput.name, input.IBizInput);
    v.component(ibizInputNumber.IBizInputNumber.name, ibizInputNumber.IBizInputNumber);
    v.component(ibizInputIp.IBizInputIP.name, ibizInputIp.IBizInputIP);
    v.component(ibizDropdown.IBizDropdown.name, ibizDropdown.IBizDropdown);
    v.component(ibizEmojiPicker.IBizEmojiPicker.name, ibizEmojiPicker.IBizEmojiPicker);
    v.component(ibizCheckbox.IBizCheckbox.name, ibizCheckbox.IBizCheckbox);
    v.component(ibizCheckboxList.IBizCheckboxList.name, ibizCheckboxList.IBizCheckboxList);
    v.component(ibizRadio.IBizRadio.name, ibizRadio.IBizRadio);
    v.component(ibizDatePicker.IBizDatePicker.name, ibizDatePicker.IBizDatePicker);
    v.component(ibizRaw.IBizRaw.name, ibizRaw.IBizRaw);
    v.component(ibizStepper.IBizStepper.name, ibizStepper.IBizStepper);
    v.component(ibizRate.IBizRate.name, ibizRate.IBizRate);
    v.component(ibizSwitch.IBizSwitch.name, ibizSwitch.IBizSwitch);
    v.component(ibizSlider.IBizSlider.name, ibizSlider.IBizSlider);
    v.component(ibizListBox.IBizListBox.name, ibizListBox.IBizListBox);
    v.component(ibizAutocomplete.IBizAutoComplete.name, ibizAutocomplete.IBizAutoComplete);
    v.component(ibizFileUpload.IBizFileUpload.name, ibizFileUpload.IBizFileUpload);
    v.component(ibizImagePreview.IBizImagePreview.name, ibizImagePreview.IBizImagePreview);
    v.component(ibizImageUpload.IBizImageUpload.name, ibizImageUpload.IBizImageUpload);
    v.component(ibizPicker.IBizPicker.name, ibizPicker.IBizPicker);
    v.component(ibizMpicker.IBizMPicker.name, ibizMpicker.IBizMPicker);
    v.component(ibizPickerDropdown.IBizPickerDropDown.name, ibizPickerDropdown.IBizPickerDropDown);
    v.component(ibizPickerLink.IBizPickerLink.name, ibizPickerLink.IBizPickerLink);
    v.component(ibizPickerEmbedView.IBizPickerEmbedView.name, ibizPickerEmbedView.IBizPickerEmbedView);
    v.component(ibizPickerSelectView.IBizPickerSelectView.name, ibizPickerSelectView.IBizPickerSelectView);
    v.component(ibizNumberRangePicker.IBizNumberRangePicker.name, ibizNumberRangePicker.IBizNumberRangePicker);
    v.component(ibizDateRangePicker.IBizDateRangePicker.name, ibizDateRangePicker.IBizDateRangePicker);
    v.component(monacoEditor.IBizCode.name, monacoEditor.IBizCode);
    v.component(ibizArray.IBizArray.name, ibizArray.IBizArray);
    v.component(ibizCascader.IBizCascader.name, ibizCascader.IBizCascader);
    v.component(ibizColorPicker.IBizColorPicker.name, ibizColorPicker.IBizColorPicker);
    v.component(ibizPresetRawitem.IBizPresetRawitem.name, ibizPresetRawitem.IBizPresetRawitem);
    v.component(ibizSearchcondEdit.IBizSearchCondEdit.name, ibizSearchcondEdit.IBizSearchCondEdit);
    v.component(ibizCarousel.IBizCarousel.name, ibizCarousel.IBizCarousel);
    v.component(
      "IBizHtml",
      vue.defineAsyncComponent(() => Promise.resolve().then(function () { return require('./html/wang-editor/wang-editor.cjs'); }))
    );
    v.component(
      "IBizMarkDown",
      vue.defineAsyncComponent(
        () => Promise.resolve().then(function () { return require('./markdown/ibiz-markdown-editor/ibiz-markdown-editor.cjs'); })
      )
    );
    v.component(dateRangeSelect.IBizDateRangeSelect.name, dateRangeSelect.IBizDateRangeSelect);
    v.component(ibizVirtualizedList.IBizVirtualizedList.name, ibizVirtualizedList.IBizVirtualizedList);
    runtime.registerEditorProvider("SPAN", () => new spanEditor_provider.SpanEditorProvider());
    runtime.registerEditorProvider(
      "SPAN_ADDRESSPICKUP",
      () => new spanEditor_provider.SpanEditorProvider()
    );
    runtime.registerEditorProvider(
      "SPAN_LINK",
      () => new spanEditor_provider.SpanEditorProvider("SPAN_LINK")
    );
    const textBoxEditorProvider = new textBoxEditor_provider.TextBoxEditorProvider();
    runtime.registerEditorProvider("TEXTBOX", () => textBoxEditorProvider);
    runtime.registerEditorProvider("TEXTAREA", () => textBoxEditorProvider);
    runtime.registerEditorProvider("TEXTAREA_10", () => textBoxEditorProvider);
    runtime.registerEditorProvider("PASSWORD", () => textBoxEditorProvider);
    runtime.registerEditorProvider("NUMBER", () => new textBoxEditor_provider.TextBoxEditorProvider("NUMBER"));
    runtime.registerEditorProvider(
      "IPADDRESSTEXTBOX",
      () => new textBoxEditor_provider.TextBoxEditorProvider("IPADDRESSTEXTBOX")
    );
    runtime.registerEditorProvider(
      "DROPDOWNLIST",
      () => new dropdownListEditor_provider.DropDownListEditorProvider()
    );
    runtime.registerEditorProvider(
      "DROPDOWNLIST_100",
      () => new dropdownListEditor_provider.DropDownListEditorProvider()
    );
    runtime.registerEditorProvider(
      "MDROPDOWNLIST",
      () => new dropdownListEditor_provider.DropDownListEditorProvider()
    );
    runtime.registerEditorProvider(
      "DROPDOWNLIST_EMOJI_PICKER",
      () => new dropdownListEditor_provider.DropDownListEditorProvider("EMOJI_PICKER")
    );
    runtime.registerEditorProvider(
      "DROPDOWNLIST_VIRTUALIZED_LIST",
      () => new dropdownListEditor_provider.DropDownListEditorProvider("VIRTUALIZED_LIST")
    );
    runtime.registerEditorProvider(
      "MDROPDOWNLIST_VIRTUALIZED_LIST",
      () => new dropdownListEditor_provider.DropDownListEditorProvider("VIRTUALIZED_LIST")
    );
    runtime.registerEditorProvider("CHECKBOX", () => new checkBoxEditor_provider.CheckBoxEditorProvider());
    runtime.registerEditorProvider(
      "CHECKBOXLIST",
      () => new checkboxListEditor_provider.CheckBoxListEditorProvider()
    );
    runtime.registerEditorProvider(
      "RADIOBUTTONLIST",
      () => new radioButtonList_provider.RadioButtonListEditorProvider()
    );
    const datePickerProvider = new datePickerEditor_provider.DatePickerEditorProvider();
    runtime.registerEditorProvider("DATEPICKER", () => datePickerProvider);
    runtime.registerEditorProvider("DATEPICKEREX", () => datePickerProvider);
    runtime.registerEditorProvider("DATEPICKEREX_NOTIME", () => datePickerProvider);
    runtime.registerEditorProvider("DATEPICKEREX_HOUR", () => datePickerProvider);
    runtime.registerEditorProvider("DATEPICKEREX_MINUTE", () => datePickerProvider);
    runtime.registerEditorProvider("DATEPICKEREX_SECOND", () => datePickerProvider);
    runtime.registerEditorProvider("DATEPICKEREX_NODAY", () => datePickerProvider);
    runtime.registerEditorProvider(
      "DATEPICKEREX_NODAY_NOSECOND",
      () => datePickerProvider
    );
    runtime.registerEditorProvider(
      "DATERANGE_SWITCHUNIT",
      () => new dateRangeSelect_provider.DateRangeSelectProvider()
    );
    runtime.registerEditorProvider(
      "FILEUPLOADER",
      () => new uploadEditor_provider.FileUploaderEditorProvider("FILEUPLOADER")
    );
    runtime.registerEditorProvider(
      "FILEUPLOADER_ONE",
      () => new uploadEditor_provider.FileUploaderEditorProvider("FILEUPLOADER_ONE")
    );
    runtime.registerEditorProvider(
      "PICTURE",
      () => new uploadEditor_provider.FileUploaderEditorProvider("PICTURE")
    );
    runtime.registerEditorProvider(
      "PICTURE_ONE",
      () => new uploadEditor_provider.FileUploaderEditorProvider("PICTURE_ONE")
    );
    runtime.registerEditorProvider(
      "PICTURE_ONE_RAW",
      () => new uploadEditor_provider.FileUploaderEditorProvider("PICTURE_ONE_RAW")
    );
    runtime.registerEditorProvider(
      "PICTURE_CROPPING",
      () => new uploadEditor_provider.FileUploaderEditorProvider("PICTURE_CROPPING")
    );
    runtime.registerEditorProvider("RAW", () => new rawEditor_provider.RawEditorProvider());
    runtime.registerEditorProvider("STEPPER", () => new stepperEditor_provider.StepperEditorProvider());
    runtime.registerEditorProvider("RATING", () => new rateEditor_provider.RateEditorProvider());
    runtime.registerEditorProvider("SLIDER", () => new sliderEditor_provider.SliderEditorProvider());
    runtime.registerEditorProvider("SWITCH", () => new switchEditor_provider.SwitchEditorProvider());
    runtime.registerEditorProvider("LISTBOX", () => new listBoxEditor_provider.ListBoxEditorProvider());
    runtime.registerEditorProvider("LISTBOXPICKUP", () => new listBoxEditor_provider.ListBoxEditorProvider());
    const AutoCompleteProvider = new autocompleteEditor_provider.AutoCompleteEditorProvider();
    runtime.registerEditorProvider("AC", () => AutoCompleteProvider);
    runtime.registerEditorProvider("AC_FS", () => AutoCompleteProvider);
    runtime.registerEditorProvider("AC_NOBUTTON", () => AutoCompleteProvider);
    runtime.registerEditorProvider("AC_FS_NOBUTTON", () => AutoCompleteProvider);
    runtime.registerEditorProvider(
      "PICKER",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKER")
    );
    runtime.registerEditorProvider(
      "PICKEREX_NOAC",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_NOAC")
    );
    runtime.registerEditorProvider(
      "PICKEREX_NOAC_LINK",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_NOAC_LINK")
    );
    runtime.registerEditorProvider(
      "PICKEREX_TRIGGER_LINK",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_TRIGGER_LINK")
    );
    runtime.registerEditorProvider(
      "PICKEREX_TRIGGER",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_TRIGGER")
    );
    runtime.registerEditorProvider(
      "PICKEREX_LINK",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_LINK")
    );
    runtime.registerEditorProvider(
      "ADDRESSPICKUP",
      () => new pickerEditor_provider.DataPickerEditorProvider("ADDRESSPICKUP")
    );
    runtime.registerEditorProvider(
      "ADDRESSPICKUP_AC",
      () => new pickerEditor_provider.DataPickerEditorProvider("ADDRESSPICKUP_AC")
    );
    runtime.registerEditorProvider(
      "PICKEREX_LINKONLY",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_LINKONLY")
    );
    runtime.registerEditorProvider(
      "PICKEREX_NOBUTTON",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_NOBUTTON")
    );
    runtime.registerEditorProvider(
      "PICKEREX_DROPDOWNVIEW",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_DROPDOWNVIEW")
    );
    runtime.registerEditorProvider(
      "PICKEREX_DROPDOWNVIEW_LINK",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKEREX_DROPDOWNVIEW_LINK")
    );
    runtime.registerEditorProvider(
      "PICKUPVIEW",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKUPVIEW")
    );
    runtime.registerEditorProvider(
      "NUMBERRANGE",
      () => new numberRangeEditor_provider.NumberRangeEditorProvider()
    );
    runtime.registerEditorProvider("DATERANGE", () => new dateRangeEditor_provider.DateRangeEditorProvider());
    runtime.registerEditorProvider(
      "DATERANGE_NOTIME",
      () => new dateRangeEditor_provider.DateRangeEditorProvider()
    );
    runtime.registerEditorProvider("CODE", () => new codeEditor_provider.CodeEditorProvider());
    runtime.registerEditorProvider("HTMLEDITOR", () => new htmlEditor_provider.HtmlEditorProvider());
    runtime.registerEditorProvider("MARKDOWN", () => new markdownEditor_provider.MarkDownEditorProvider());
    runtime.registerEditorProvider("ARRAY", () => new arrayEditor_provider.ArrayEditorProvider());
    runtime.registerEditorProvider("CASCADER", () => new cascaderEditor_provider.CascaderEditorProvider());
    runtime.registerEditorProvider(
      "COLORPICKER",
      () => new colorPickerEditor_provider.ColorPickerEditorProvider()
    );
    runtime.registerEditorProvider(
      "PICKER_searchCondEdit",
      () => new ibizSearchcondEdit_provider.SearchCondEditEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_IMAGE_PICTURE_ONE",
      () => new uploadEditor_provider.FileUploaderEditorProvider("PICTURE_ONE")
    );
    runtime.registerEditorProvider(
      "FIELD_IMAGE_PICTURE",
      () => new uploadEditor_provider.FileUploaderEditorProvider("PICTURE")
    );
    runtime.registerEditorProvider(
      "FIELD_TEXT_DYNAMIC_SPAN",
      () => new spanEditor_provider.SpanEditorProvider()
    );
    runtime.registerEditorProvider(
      "VIEW_PAGECAPTION_SPAN",
      () => new spanEditor_provider.SpanEditorProvider()
    );
    runtime.registerEditorProvider("STATIC_LABEL_RAW", () => new rawEditor_provider.RawEditorProvider());
    runtime.registerEditorProvider(
      "FIELD_TEXTBOX_TEXTBOX",
      () => textBoxEditorProvider
    );
    runtime.registerEditorProvider(
      "FIELD_TEXTAREA_TEXTAREA",
      () => textBoxEditorProvider
    );
    runtime.registerEditorProvider(
      "FIELD_RADIOBUTTONLIST_RADIOBUTTONLIST",
      () => new radioButtonList_provider.RadioButtonListEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_CHECKBOXLIST_CHECKBOXLIST",
      () => new checkboxListEditor_provider.CheckBoxListEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_DROPDOWNLIST_DROPDOWNLIST",
      () => new dropdownListEditor_provider.DropDownListEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_RATING_RATING",
      () => new rateEditor_provider.RateEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_SWITCH_SWITCH",
      () => new switchEditor_provider.SwitchEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_SLIDER_SLIDER",
      () => new sliderEditor_provider.SliderEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_DATEPICKER_DATEPICKER",
      () => new datePickerEditor_provider.DatePickerEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_DATERANGE_DATERANGE",
      () => new dateRangeEditor_provider.DateRangeEditorProvider()
    );
    runtime.registerEditorProvider(
      "FIELD_PICKER_PICKER",
      () => new pickerEditor_provider.DataPickerEditorProvider("PICKER")
    );
    runtime.registerEditorProvider(
      "FIELD_ARRAY_ARRAY",
      () => new arrayEditor_provider.ArrayEditorProvider()
    );
    runtime.registerEditorProvider("AUTH_USERID_TEXTBOX", () => textBoxEditorProvider);
    runtime.registerEditorProvider(
      "AUTH_PASSWORD_PASSWORD",
      () => textBoxEditorProvider
    );
    runtime.registerEditorProvider(
      "FIELD_CAROUSEL_PICTURE",
      () => new carouselEditor_provider.CarouselEditorProvider()
    );
  }
};

exports.IBizEditor = IBizEditor;
exports.default = IBizEditor;
