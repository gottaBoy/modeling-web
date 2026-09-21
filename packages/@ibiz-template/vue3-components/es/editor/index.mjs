import { registerEditorProvider } from '@ibiz-template/runtime';
import { defineAsyncComponent } from 'vue';
import { NotSupportedEditor } from './not-supported-editor/not-supported-editor.mjs';
import './span/index.mjs';
import './text-box/index.mjs';
import './dropdown-list/index.mjs';
import './check-box/index.mjs';
import './check-box-list/index.mjs';
import './radio-button-list/index.mjs';
import './date-picker/index.mjs';
import './raw/index.mjs';
import './stepper/index.mjs';
import './rate/index.mjs';
import './switch/index.mjs';
import './slider/index.mjs';
import './list-box/index.mjs';
import './autocomplete/index.mjs';
import './upload/index.mjs';
import './data-picker/index.mjs';
import './number-range/index.mjs';
import './date-range/index.mjs';
import './code/index.mjs';
import './html/index.mjs';
import './markdown/index.mjs';
import './array/index.mjs';
import './cascader/index.mjs';
import './color-picker/index.mjs';
import './preset/index.mjs';
import './carousel/index.mjs';
import './user/ibiz-searchcond-edit/index.mjs';
import './date-range-select/index.mjs';
import { IBizImageCropping } from './upload/ibiz-image-cropping/ibiz-image-cropping.mjs';
import { IBizSpan } from './span/span/span.mjs';
import { IBizSpanLink } from './span/span-link/span-link.mjs';
import { IBizInput } from './text-box/input/input.mjs';
import { IBizInputNumber } from './text-box/ibiz-input-number/ibiz-input-number.mjs';
import { IBizInputIP } from './text-box/ibiz-input-ip/ibiz-input-ip.mjs';
import { IBizDropdown } from './dropdown-list/ibiz-dropdown/ibiz-dropdown.mjs';
import { IBizEmojiPicker } from './dropdown-list/ibiz-emoji-picker/ibiz-emoji-picker.mjs';
import { IBizCheckbox } from './check-box/ibiz-checkbox/ibiz-checkbox.mjs';
import { IBizCheckboxList } from './check-box-list/ibiz-checkbox-list/ibiz-checkbox-list.mjs';
import { IBizRadio } from './radio-button-list/ibiz-radio/ibiz-radio.mjs';
import { IBizDatePicker } from './date-picker/ibiz-date-picker/ibiz-date-picker.mjs';
import { IBizRaw } from './raw/ibiz-raw/ibiz-raw.mjs';
import { IBizStepper } from './stepper/ibiz-stepper/ibiz-stepper.mjs';
import { IBizRate } from './rate/ibiz-rate/ibiz-rate.mjs';
import { IBizSwitch } from './switch/ibiz-switch/ibiz-switch.mjs';
import { IBizSlider } from './slider/ibiz-slider/ibiz-slider.mjs';
import { IBizListBox } from './list-box/ibiz-list-box/ibiz-list-box.mjs';
import { IBizAutoComplete } from './autocomplete/ibiz-autocomplete/ibiz-autocomplete.mjs';
import { IBizFileUpload } from './upload/ibiz-file-upload/ibiz-file-upload.mjs';
import { IBizImagePreview } from './upload/ibiz-image-preview/ibiz-image-preview.mjs';
import { IBizImageUpload } from './upload/ibiz-image-upload/ibiz-image-upload.mjs';
import { IBizPicker } from './data-picker/ibiz-picker/ibiz-picker.mjs';
import { IBizMPicker } from './data-picker/ibiz-mpicker/ibiz-mpicker.mjs';
import { IBizPickerDropDown } from './data-picker/ibiz-picker-dropdown/ibiz-picker-dropdown.mjs';
import { IBizPickerLink } from './data-picker/ibiz-picker-link/ibiz-picker-link.mjs';
import { IBizPickerEmbedView } from './data-picker/ibiz-picker-embed-view/ibiz-picker-embed-view.mjs';
import { IBizPickerSelectView } from './data-picker/ibiz-picker-select-view/ibiz-picker-select-view.mjs';
import { IBizNumberRangePicker } from './number-range/ibiz-number-range-picker/ibiz-number-range-picker.mjs';
import { IBizDateRangePicker } from './date-range/ibiz-date-range-picker/ibiz-date-range-picker.mjs';
import { IBizCode } from './code/monaco-editor/monaco-editor.mjs';
import { IBizArray } from './array/ibiz-array/ibiz-array.mjs';
import { IBizCascader } from './cascader/ibiz-cascader/ibiz-cascader.mjs';
import { IBizColorPicker } from './color-picker/ibiz-color-picker/ibiz-color-picker.mjs';
import { IBizPresetRawitem } from './preset/preset-rawitem/ibiz-preset-rawitem/ibiz-preset-rawitem.mjs';
import { IBizSearchCondEdit } from './user/ibiz-searchcond-edit/ibiz-searchcond-edit.mjs';
import { IBizCarousel } from './carousel/ibiz-carousel/ibiz-carousel.mjs';
import { IBizDateRangeSelect } from './date-range-select/date-range-select-picker/date-range-select.mjs';
import { IBizVirtualizedList } from './dropdown-list/ibiz-virtualized-list/ibiz-virtualized-list.mjs';
import { SpanEditorProvider } from './span/span-editor.provider.mjs';
import { TextBoxEditorProvider } from './text-box/text-box-editor.provider.mjs';
import { DropDownListEditorProvider } from './dropdown-list/dropdown-list-editor.provider.mjs';
import { CheckBoxEditorProvider } from './check-box/check-box-editor.provider.mjs';
import { CheckBoxListEditorProvider } from './check-box-list/checkbox-list-editor.provider.mjs';
import { RadioButtonListEditorProvider } from './radio-button-list/radio-button-list.provider.mjs';
import { DatePickerEditorProvider } from './date-picker/date-picker-editor.provider.mjs';
import { DateRangeSelectProvider } from './date-range-select/date-range-select.provider.mjs';
import { FileUploaderEditorProvider } from './upload/upload-editor.provider.mjs';
import { RawEditorProvider } from './raw/raw-editor.provider.mjs';
import { StepperEditorProvider } from './stepper/stepper-editor.provider.mjs';
import { RateEditorProvider } from './rate/rate-editor.provider.mjs';
import { SliderEditorProvider } from './slider/slider-editor.provider.mjs';
import { SwitchEditorProvider } from './switch/switch-editor.provider.mjs';
import { ListBoxEditorProvider } from './list-box/list-box-editor.provider.mjs';
import { AutoCompleteEditorProvider } from './autocomplete/autocomplete-editor.provider.mjs';
import { DataPickerEditorProvider } from './data-picker/picker-editor.provider.mjs';
import { NumberRangeEditorProvider } from './number-range/number-range-editor.provider.mjs';
import { DateRangeEditorProvider } from './date-range/date-range-editor.provider.mjs';
import { CodeEditorProvider } from './code/code-editor.provider.mjs';
import { HtmlEditorProvider } from './html/html-editor.provider.mjs';
import { MarkDownEditorProvider } from './markdown/markdown-editor.provider.mjs';
import { ArrayEditorProvider } from './array/array-editor.provider.mjs';
import { CascaderEditorProvider } from './cascader/cascader-editor.provider.mjs';
import { ColorPickerEditorProvider } from './color-picker/color-picker-editor.provider.mjs';
import { SearchCondEditEditorProvider } from './user/ibiz-searchcond-edit/ibiz-searchcond-edit.provider.mjs';
import { CarouselEditorProvider } from './carousel/carousel-editor.provider.mjs';

"use strict";
const IBizEditor = {
  install: (v) => {
    v.component(IBizImageCropping.name, IBizImageCropping);
    v.component(NotSupportedEditor.name, NotSupportedEditor);
    v.component(IBizSpan.name, IBizSpan);
    v.component(IBizSpanLink.name, IBizSpanLink);
    v.component(IBizInput.name, IBizInput);
    v.component(IBizInputNumber.name, IBizInputNumber);
    v.component(IBizInputIP.name, IBizInputIP);
    v.component(IBizDropdown.name, IBizDropdown);
    v.component(IBizEmojiPicker.name, IBizEmojiPicker);
    v.component(IBizCheckbox.name, IBizCheckbox);
    v.component(IBizCheckboxList.name, IBizCheckboxList);
    v.component(IBizRadio.name, IBizRadio);
    v.component(IBizDatePicker.name, IBizDatePicker);
    v.component(IBizRaw.name, IBizRaw);
    v.component(IBizStepper.name, IBizStepper);
    v.component(IBizRate.name, IBizRate);
    v.component(IBizSwitch.name, IBizSwitch);
    v.component(IBizSlider.name, IBizSlider);
    v.component(IBizListBox.name, IBizListBox);
    v.component(IBizAutoComplete.name, IBizAutoComplete);
    v.component(IBizFileUpload.name, IBizFileUpload);
    v.component(IBizImagePreview.name, IBizImagePreview);
    v.component(IBizImageUpload.name, IBizImageUpload);
    v.component(IBizPicker.name, IBizPicker);
    v.component(IBizMPicker.name, IBizMPicker);
    v.component(IBizPickerDropDown.name, IBizPickerDropDown);
    v.component(IBizPickerLink.name, IBizPickerLink);
    v.component(IBizPickerEmbedView.name, IBizPickerEmbedView);
    v.component(IBizPickerSelectView.name, IBizPickerSelectView);
    v.component(IBizNumberRangePicker.name, IBizNumberRangePicker);
    v.component(IBizDateRangePicker.name, IBizDateRangePicker);
    v.component(IBizCode.name, IBizCode);
    v.component(IBizArray.name, IBizArray);
    v.component(IBizCascader.name, IBizCascader);
    v.component(IBizColorPicker.name, IBizColorPicker);
    v.component(IBizPresetRawitem.name, IBizPresetRawitem);
    v.component(IBizSearchCondEdit.name, IBizSearchCondEdit);
    v.component(IBizCarousel.name, IBizCarousel);
    v.component(
      "IBizHtml",
      defineAsyncComponent(() => import('./html/wang-editor/wang-editor.mjs'))
    );
    v.component(
      "IBizMarkDown",
      defineAsyncComponent(
        () => import('./markdown/ibiz-markdown-editor/ibiz-markdown-editor.mjs')
      )
    );
    v.component(IBizDateRangeSelect.name, IBizDateRangeSelect);
    v.component(IBizVirtualizedList.name, IBizVirtualizedList);
    registerEditorProvider("SPAN", () => new SpanEditorProvider());
    registerEditorProvider(
      "SPAN_ADDRESSPICKUP",
      () => new SpanEditorProvider()
    );
    registerEditorProvider(
      "SPAN_LINK",
      () => new SpanEditorProvider("SPAN_LINK")
    );
    const textBoxEditorProvider = new TextBoxEditorProvider();
    registerEditorProvider("TEXTBOX", () => textBoxEditorProvider);
    registerEditorProvider("TEXTAREA", () => textBoxEditorProvider);
    registerEditorProvider("TEXTAREA_10", () => textBoxEditorProvider);
    registerEditorProvider("PASSWORD", () => textBoxEditorProvider);
    registerEditorProvider("NUMBER", () => new TextBoxEditorProvider("NUMBER"));
    registerEditorProvider(
      "IPADDRESSTEXTBOX",
      () => new TextBoxEditorProvider("IPADDRESSTEXTBOX")
    );
    registerEditorProvider(
      "DROPDOWNLIST",
      () => new DropDownListEditorProvider()
    );
    registerEditorProvider(
      "DROPDOWNLIST_100",
      () => new DropDownListEditorProvider()
    );
    registerEditorProvider(
      "MDROPDOWNLIST",
      () => new DropDownListEditorProvider()
    );
    registerEditorProvider(
      "DROPDOWNLIST_EMOJI_PICKER",
      () => new DropDownListEditorProvider("EMOJI_PICKER")
    );
    registerEditorProvider(
      "DROPDOWNLIST_VIRTUALIZED_LIST",
      () => new DropDownListEditorProvider("VIRTUALIZED_LIST")
    );
    registerEditorProvider(
      "MDROPDOWNLIST_VIRTUALIZED_LIST",
      () => new DropDownListEditorProvider("VIRTUALIZED_LIST")
    );
    registerEditorProvider("CHECKBOX", () => new CheckBoxEditorProvider());
    registerEditorProvider(
      "CHECKBOXLIST",
      () => new CheckBoxListEditorProvider()
    );
    registerEditorProvider(
      "RADIOBUTTONLIST",
      () => new RadioButtonListEditorProvider()
    );
    const datePickerProvider = new DatePickerEditorProvider();
    registerEditorProvider("DATEPICKER", () => datePickerProvider);
    registerEditorProvider("DATEPICKEREX", () => datePickerProvider);
    registerEditorProvider("DATEPICKEREX_NOTIME", () => datePickerProvider);
    registerEditorProvider("DATEPICKEREX_HOUR", () => datePickerProvider);
    registerEditorProvider("DATEPICKEREX_MINUTE", () => datePickerProvider);
    registerEditorProvider("DATEPICKEREX_SECOND", () => datePickerProvider);
    registerEditorProvider("DATEPICKEREX_NODAY", () => datePickerProvider);
    registerEditorProvider(
      "DATEPICKEREX_NODAY_NOSECOND",
      () => datePickerProvider
    );
    registerEditorProvider(
      "DATERANGE_SWITCHUNIT",
      () => new DateRangeSelectProvider()
    );
    registerEditorProvider(
      "FILEUPLOADER",
      () => new FileUploaderEditorProvider("FILEUPLOADER")
    );
    registerEditorProvider(
      "FILEUPLOADER_ONE",
      () => new FileUploaderEditorProvider("FILEUPLOADER_ONE")
    );
    registerEditorProvider(
      "PICTURE",
      () => new FileUploaderEditorProvider("PICTURE")
    );
    registerEditorProvider(
      "PICTURE_ONE",
      () => new FileUploaderEditorProvider("PICTURE_ONE")
    );
    registerEditorProvider(
      "PICTURE_ONE_RAW",
      () => new FileUploaderEditorProvider("PICTURE_ONE_RAW")
    );
    registerEditorProvider(
      "PICTURE_CROPPING",
      () => new FileUploaderEditorProvider("PICTURE_CROPPING")
    );
    registerEditorProvider("RAW", () => new RawEditorProvider());
    registerEditorProvider("STEPPER", () => new StepperEditorProvider());
    registerEditorProvider("RATING", () => new RateEditorProvider());
    registerEditorProvider("SLIDER", () => new SliderEditorProvider());
    registerEditorProvider("SWITCH", () => new SwitchEditorProvider());
    registerEditorProvider("LISTBOX", () => new ListBoxEditorProvider());
    registerEditorProvider("LISTBOXPICKUP", () => new ListBoxEditorProvider());
    const AutoCompleteProvider = new AutoCompleteEditorProvider();
    registerEditorProvider("AC", () => AutoCompleteProvider);
    registerEditorProvider("AC_FS", () => AutoCompleteProvider);
    registerEditorProvider("AC_NOBUTTON", () => AutoCompleteProvider);
    registerEditorProvider("AC_FS_NOBUTTON", () => AutoCompleteProvider);
    registerEditorProvider(
      "PICKER",
      () => new DataPickerEditorProvider("PICKER")
    );
    registerEditorProvider(
      "PICKEREX_NOAC",
      () => new DataPickerEditorProvider("PICKEREX_NOAC")
    );
    registerEditorProvider(
      "PICKEREX_NOAC_LINK",
      () => new DataPickerEditorProvider("PICKEREX_NOAC_LINK")
    );
    registerEditorProvider(
      "PICKEREX_TRIGGER_LINK",
      () => new DataPickerEditorProvider("PICKEREX_TRIGGER_LINK")
    );
    registerEditorProvider(
      "PICKEREX_TRIGGER",
      () => new DataPickerEditorProvider("PICKEREX_TRIGGER")
    );
    registerEditorProvider(
      "PICKEREX_LINK",
      () => new DataPickerEditorProvider("PICKEREX_LINK")
    );
    registerEditorProvider(
      "ADDRESSPICKUP",
      () => new DataPickerEditorProvider("ADDRESSPICKUP")
    );
    registerEditorProvider(
      "ADDRESSPICKUP_AC",
      () => new DataPickerEditorProvider("ADDRESSPICKUP_AC")
    );
    registerEditorProvider(
      "PICKEREX_LINKONLY",
      () => new DataPickerEditorProvider("PICKEREX_LINKONLY")
    );
    registerEditorProvider(
      "PICKEREX_NOBUTTON",
      () => new DataPickerEditorProvider("PICKEREX_NOBUTTON")
    );
    registerEditorProvider(
      "PICKEREX_DROPDOWNVIEW",
      () => new DataPickerEditorProvider("PICKEREX_DROPDOWNVIEW")
    );
    registerEditorProvider(
      "PICKEREX_DROPDOWNVIEW_LINK",
      () => new DataPickerEditorProvider("PICKEREX_DROPDOWNVIEW_LINK")
    );
    registerEditorProvider(
      "PICKUPVIEW",
      () => new DataPickerEditorProvider("PICKUPVIEW")
    );
    registerEditorProvider(
      "NUMBERRANGE",
      () => new NumberRangeEditorProvider()
    );
    registerEditorProvider("DATERANGE", () => new DateRangeEditorProvider());
    registerEditorProvider(
      "DATERANGE_NOTIME",
      () => new DateRangeEditorProvider()
    );
    registerEditorProvider("CODE", () => new CodeEditorProvider());
    registerEditorProvider("HTMLEDITOR", () => new HtmlEditorProvider());
    registerEditorProvider("MARKDOWN", () => new MarkDownEditorProvider());
    registerEditorProvider("ARRAY", () => new ArrayEditorProvider());
    registerEditorProvider("CASCADER", () => new CascaderEditorProvider());
    registerEditorProvider(
      "COLORPICKER",
      () => new ColorPickerEditorProvider()
    );
    registerEditorProvider(
      "PICKER_searchCondEdit",
      () => new SearchCondEditEditorProvider()
    );
    registerEditorProvider(
      "FIELD_IMAGE_PICTURE_ONE",
      () => new FileUploaderEditorProvider("PICTURE_ONE")
    );
    registerEditorProvider(
      "FIELD_IMAGE_PICTURE",
      () => new FileUploaderEditorProvider("PICTURE")
    );
    registerEditorProvider(
      "FIELD_TEXT_DYNAMIC_SPAN",
      () => new SpanEditorProvider()
    );
    registerEditorProvider(
      "VIEW_PAGECAPTION_SPAN",
      () => new SpanEditorProvider()
    );
    registerEditorProvider("STATIC_LABEL_RAW", () => new RawEditorProvider());
    registerEditorProvider(
      "FIELD_TEXTBOX_TEXTBOX",
      () => textBoxEditorProvider
    );
    registerEditorProvider(
      "FIELD_TEXTAREA_TEXTAREA",
      () => textBoxEditorProvider
    );
    registerEditorProvider(
      "FIELD_RADIOBUTTONLIST_RADIOBUTTONLIST",
      () => new RadioButtonListEditorProvider()
    );
    registerEditorProvider(
      "FIELD_CHECKBOXLIST_CHECKBOXLIST",
      () => new CheckBoxListEditorProvider()
    );
    registerEditorProvider(
      "FIELD_DROPDOWNLIST_DROPDOWNLIST",
      () => new DropDownListEditorProvider()
    );
    registerEditorProvider(
      "FIELD_RATING_RATING",
      () => new RateEditorProvider()
    );
    registerEditorProvider(
      "FIELD_SWITCH_SWITCH",
      () => new SwitchEditorProvider()
    );
    registerEditorProvider(
      "FIELD_SLIDER_SLIDER",
      () => new SliderEditorProvider()
    );
    registerEditorProvider(
      "FIELD_DATEPICKER_DATEPICKER",
      () => new DatePickerEditorProvider()
    );
    registerEditorProvider(
      "FIELD_DATERANGE_DATERANGE",
      () => new DateRangeEditorProvider()
    );
    registerEditorProvider(
      "FIELD_PICKER_PICKER",
      () => new DataPickerEditorProvider("PICKER")
    );
    registerEditorProvider(
      "FIELD_ARRAY_ARRAY",
      () => new ArrayEditorProvider()
    );
    registerEditorProvider("AUTH_USERID_TEXTBOX", () => textBoxEditorProvider);
    registerEditorProvider(
      "AUTH_PASSWORD_PASSWORD",
      () => textBoxEditorProvider
    );
    registerEditorProvider(
      "FIELD_CAROUSEL_PICTURE",
      () => new CarouselEditorProvider()
    );
  }
};

export { IBizEditor, IBizEditor as default };
