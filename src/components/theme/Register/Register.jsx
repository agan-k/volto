import { useEffect, useState } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Form, Toast } from '@plone/volto/components';
import { createUser } from '@plone/volto/actions';

import { useUsers } from '@plone/volto/hooks/users/useUsers';

const messages = defineMessages({
  title: {
    id: 'Registration form',
    defaultMessage: 'Registration form',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  fullnameTitle: {
    id: 'Full Name',
    defaultMessage: 'Full Name',
  },
  fullnameDescription: {
    id: 'Enter full name, e.g. John Smith.',
    defaultMessage: 'Enter full name, e.g. John Smith.',
  },
  emailTitle: {
    id: 'E-mail',
    defaultMessage: 'E-mail',
  },
  emailDescription: {
    id:
      'Enter an email address. This will be your login name. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
    defaultMessage:
      'Enter an email address. This will be your login name. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
  },
  successRegisterCompletedTitle: {
    id: 'Account Registration Completed',
    defaultMessage: 'Account Registration Completed',
  },
  successRegisterCompletedBody: {
    id:
      'The registration process has been successful. Please check your e-mail inbox for information on how activate your account.',
    defaultMessage:
      'The registration process has been successful. Please check your e-mail inbox for information on how activate your account.',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
});


const Register=({ history })=> {


  const dispatch=useDispatch();
  const intl=useIntl();
  const [errors,setError]=useState(null);
  const {loaded,loading,error}=useUsers();
 
  
  useEffect(()=>{
    if (loading && loaded) {
      toast.success(
        <Toast
          success
          title={intl.formatMessage(
            messages.successRegisterCompletedTitle,
          )}
          content={intl.formatMessage(
            messages.successRegisterCompletedBody,
          )}
        />,
      );
      history.push('/login');
    }
  },[intl,history,loaded,loading]);
 

 const onSubmit=(data)=>{
    dispatch(createUser({
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    }));
    setError(null);
  }

    return (
      <div id="page-register">
        <Helmet title={intl.formatMessage(messages.register)} />
        <Form
          onSubmit={onSubmit}
          title={intl.formatMessage(messages.title)}
          error={errors || error}
          loading={loading}
          submitLabel={intl.formatMessage(messages.register)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: intl.formatMessage(messages.default),
                fields: ['fullname', 'email'],
              },
            ],
            properties: {
              fullname: {
                type: 'string',
                title: intl.formatMessage(messages.fullnameTitle),
                description: intl.formatMessage(
                  messages.fullnameDescription,
                ),
              },
              email: {
                type: 'string',
                title: intl.formatMessage(messages.emailTitle),
                description: intl.formatMessage(
                  messages.emailDescription,
                ),
              },
            },
            required: ['fullname', 'email'],
          }}
        />
      </div>
    );
  }

  Register.propTypes = {
    createUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
  };


  Register.defaultProps = {
    error: null,
  };

export default compose(withRouter)(Register);