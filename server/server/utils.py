from environs import Env, EnvError

def load_env_variables():
    try:
        env = Env()
        env.read_env()

        # Django config
        env.str("MODE")
        env.str("DJ_SECRET")

    except EnvError as e:
        print(f"Environment configuration error: {e}")

    finally:
        variables = env.dump()
        # print(f'Enviroment configs:')
        # for key, val in variables.items():
        #     print(f'{key}={val}')
        return variables


ENV_VARS = load_env_variables()