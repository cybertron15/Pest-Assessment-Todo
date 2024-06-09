from environs import Env, EnvError

def load_env_variables():
    try:
        env = Env()
        env.read_env()

        # Django config
        env.str("MODE")
        env.str("DJ_SECRET")
        env.str("CORS_ALLOWED_ORIGINS")

    except EnvError as e:
        print(f"Environment configuration error: {e}")

    finally:
        variables = env.dump()
        # CORS_ALLOWED_ORIGINS = True if variables['MODE'] == 'dev' else variables['CORS_ALLOWED_ORIGINS'].split(',')
        # print(CORS_ALLOWED_ORIGINS)
        # print(f'Enviroment configs:')
        # for key, val in variables.items():
        #     print(f'{key}={val}')
        return variables


ENV_VARS = load_env_variables()