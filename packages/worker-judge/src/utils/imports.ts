function getImportsByLanguage(language: string) {
  switch (language) {
    case "cpp":
      return `#include <bits/stdc++.h>
      using namespace std;`;

    case "java":
      return `import java.util.*;
      import java.io.*;`;
    default:
      return "";
  }
}

export { getImportsByLanguage };
