import React, {
  Component,
  createContext,
  ReactNode,
} from "react";
export const AuthContext = createContext(null);

interface IAuthProps {
  children: ReactNode;
}

class AuthProvider extends Component<IAuthProps> {
  state = {
    token: localStorage.getItem("token") || null,
    user: null,
    authenticate: (token: string, name: string) => {
      this.setState(() => ({
        token: token || null,
        user: { name }
      }));
    },
  };
  static propTypes: {
    children: {
      map<T, C>(
        children: C | readonly C[],
        fn: (child: C, index: number) => T
      ): C extends null ? C : Exclude<T, boolean>[];
      forEach<C>(
        children: C | readonly C[],
        fn: (child: C, index: number) => void
      ): void;
      count(children: any): number;
      only<C>(children: C): C extends any[] ? never : C;
      toArray(
        children: React.ReactNode | React.ReactNode[]
      ): (
        | string
        | number
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactFragment
        | React.ReactPortal
      )[];
    };
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
