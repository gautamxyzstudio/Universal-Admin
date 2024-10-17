/* eslint-disable react/display-name */
'use client';

import React, {
  ChangeEvent,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import FormDialog from '@/components/molecules/DialogTypes/FormDialog/FormDialog';
import { IAddNewFromProps, IDynamicFormField } from './AddNewForm.types';
import { IFieldTypes } from '@/constant/enums';
import FormTextInput from '@/components/molecules/InputTypes/FormTextInput/FormTextInput';
import { STRINGS } from '@/constant/en';
import Switch from '@/components/atoms/Switch/Switch';
import CustomButton from '@/components/atoms/CutomButton/CustomButton';
import { extractFirstAndLastNameFromName } from '@/utility/cookies';

const FormRenderer = React.memo(
  ({
    item,
    fields,
    onChangeField,
    switchChangeHandler,
  }: {
    item: IDynamicFormField;
    fields: { [key: string]: string };
    onChangeField: (key: string, e: ChangeEvent<HTMLInputElement>) => void;
    switchChangeHandler: (value: string) => void;
  }) => {
    const value = fields[item.apiKey] || '';
    const errorMessageValue = fields[`${item.apiKey}Error`] || '';
    if (
      item.type === IFieldTypes.EMAIL ||
      (item.type === IFieldTypes.SIMPLE && item.displayName !== STRINGS.name)
    ) {
      return (
        <FormTextInput
          value={value}
          maxLength={50}
          onChange={(e) => onChangeField(item.apiKey, e)}
          errorMessage={errorMessageValue}
          label={item.displayName}
        />
      );
    } else if (
      item.type === IFieldTypes.SIMPLE &&
      item.displayName === STRINGS.name
    ) {
      return (
        <div className="flex flex-row gap-x-4">
          <FormTextInput
            value={fields[STRINGS.firstNameKey] || ''}
            onChange={(e) => onChangeField(STRINGS.firstNameKey, e)}
            errorMessage={fields[STRINGS.firstNameKeyError]}
            label={STRINGS.firstName}
          />
          <FormTextInput
            value={fields[STRINGS.lastNameKey] || ''}
            onChange={(e) => onChangeField(STRINGS.lastNameKey, e)}
            errorMessage={fields[STRINGS.lastNameKeyError]}
            label={STRINGS.lastName}
          />
        </div>
      );
    } else if (item.type === IFieldTypes.MOBILE) {
      return (
        <FormTextInput
          value={value}
          onChange={(e) => onChangeField(item.apiKey, e)}
          errorMessage={errorMessageValue}
          maxLength={10}
          label={item.displayName}
        />
      );
    } else if (item.type === IFieldTypes.STATUS) {
      const isTrue = fields[item.apiKey] === 'true';
      const styles = isTrue ? 'text-sm text-green' : 'text-sm text-red';
      return (
        <Switch
          checked={isTrue}
          onChange={(event, isChecked) =>
            switchChangeHandler(isChecked ? 'true' : 'false')
          }
          label={isTrue ? 'Active' : 'InActive'}
          className={styles}
        />
      );
    } else if (item.type === IFieldTypes.PASSWORD) {
      return (
        <FormTextInput
          value={value}
          onChange={(e) => onChangeField(item.apiKey, e)}
          errorMessage={errorMessageValue}
          type="password"
          maxLength={32}
          label={item.displayName}
        />
      );
    }
    return null;
  }
);

const AddNewForm: React.FC<IAddNewFromProps> = ({
  data,
  onPressSubmit,
  ...props
}) => {
  const [fields, setFields] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const localFields: { [key: string]: string } = {};
    data?.forEach((field) => {
      if (
        field.type === IFieldTypes.SIMPLE &&
        field.displayName === STRINGS.name
      ) {
        const { firstName, lastName } = extractFirstAndLastNameFromName(
          field.value
        );
        localFields[STRINGS.firstNameKey] = firstName;

        localFields[STRINGS.lastNameKey] = lastName;
      } else {
        localFields[field.apiKey] = field.value;
      }
    });
    setFields(localFields);
  }, [data]);

  const validateFields = () => {
    let isValid = true;
    const cleanedFields = sanitizeFields();
    Object.keys(cleanedFields).forEach((key) => {
      if (!fields[key]) {
        setFields((prevFields) => ({
          ...prevFields,
          [`${key}Error`]: `This is a required field`,
        }));
        isValid = false;
      }
    });

    if (isValid) {
      onPressSubmit(cleanedFields);
      clearForm();
    }
  };

  const onChangeField = useCallback(
    (key: string, e: ChangeEvent<HTMLInputElement>) => {
      setFields((prevFields) => ({
        ...prevFields,
        [key]: e.target.value,
        [`${key}Error`]: '',
      }));
    },
    []
  );

  const crossPressHandler = () => {
    clearForm();
    props.onPressCross();
  };

  const clearForm = () => {
    setFields((prev) => {
      Object.keys(prev).forEach((key) => {
        if (key !== 'status') {
          prev[key] = '';
        }
      });
      return prev;
    });
  };

  const sanitizeFields = () => {
    const cleanFields = Object.keys(fields)
      .filter((key) => !key.endsWith('Error'))
      .reduce((acc, key) => {
        acc[key] = fields[key]; // Add the filtered key-value pairs to the new object
        return acc;
      }, {} as { [key: string]: any });
    return cleanFields;
  };

  const switchChangeHandler = (value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      status: value,
    }));
  };

  const renderedFields = useMemo(
    () =>
      data?.map((item, index) => (
        <FormRenderer
          key={index}
          item={item}
          fields={fields}
          onChangeField={onChangeField}
          switchChangeHandler={switchChangeHandler}
        />
      )),
    [data, fields, onChangeField]
  );

  return (
    <FormDialog {...props} onPressCross={crossPressHandler}>
      <div className="flex my-6 flex-col gap-y-4">{renderedFields}</div>
      <CustomButton
        fullWidth
        title={'Create'}
        onClick={validateFields}
        buttonType={'primary-small'}
      />
    </FormDialog>
  );
};

export default AddNewForm;
