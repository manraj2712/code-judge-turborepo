
      #include <bits/stdc++.h>
      using namespace std;
      
class Solution{
public:	
	// Function returns the second
	// largest elements
	int print2largest(int arr[], int n) {
	    // code here
	}
};
      int main()
{
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    ifstream expectedOutputFile("expected-output.txt");

    int n;
    cin >> n;
    Solution obj;

    int t = n;
    while (t--)
    {
        int size;
        cin >> size;

        int arr[size];
        for (int i = 0; i < size; i++)
        {
            cin >> arr[i];
        }

        int expected_output;
        expectedOutputFile >> expected_output;

        int output = obj.print2largest(arr, size+1);
        if (output != expected_output)
        {
            cout << "Failed for test case " << n - t << endl;
            cout << "Expected output: " << expected_output << endl;
            cout << "Your output: " << output;
            return 0;
        }
    }

    cout << "Success";
    return 0;
}
      