# Functional programming workshop

1.  Clone the repository:

    ```console
    $ git clone https://github.com/davidchambers/fp-workshop.git && cd fp-workshop
    ```

2.  Install dependencies:

    ```console
    $ npm install
    ```

3.  Start the server:

    ```console
    $ node server.js
    Server listening at http://127.0.0.1:12345
    ```

4.  Check that the server is operational:

    ```console
    $ curl http://127.0.0.1:12345/users/9999  # replace 12345 with the port number printed when the server started
    {"id":"9999","username":"alice","address":{"city":"Munich","country":"Germany"}}
    ```

5.  Check that the __v0__ tests pass (the __v1__ tests will fail):

    ```console
    $ PORT=12345 npm test  # replace 12345 with the port number printed when the server started
    ```
