# PARKOUR
A simple parking lot backend

I own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is given a number starting at increasing with increasing distance from the entry point in steps of one. I want to create an automated ticketing system that allows my customers to use my parking lot without human intervention.

When a car enters my parking lot, I want to have a ticket issued to the driver. The ticket issuing process includes us documenting the registration number and the colour of the car and allocating an available parking slot to the car before actually handing over a ticket to the driver.

The customer should be allocated a parking slot which is nearest to the entry.

At the exit the customer returns the ticket with the time the car was parked in the lot, which then marks the slot they were using as being available. Total parking charge should be calculated as per the parking time. Charge applicable is $10 for first 2 hours and $10 for every additional hour.

I interact with the system via a simple set of commands which produce a specific output.

The system should be able to accept a filename as a parameter at the command prompt and read the commands from that file.


#### Supported commands:
1. `create_parking_lot 6` create a parking lot with 1 level and 6 parking spots.
    ```sh
    create_parking_lot <number_of_parking_spots>
    ```
    
2. `park KA-01-8989` should let the car to the nearest vacant spot. If no spot is vacant, should send an apologetic message.
    ```sh
    park <registration>
    ```
    
3. `leave KA-01-3434` should remove the car and charge parking fees. If the car is not present in the parking lot, an appropriate message is sent.
    ```sh
    leave <registration> <duration>
    ```

4. `status` shows the list of filled spots and the corresponding car
    ```sh
    status
    ```


#### Notice:
- Having spaces between, before or after the command is accepted.
- the registration number should be in upper case and/or numbers
- commands should be in the small case
- executing `create_parking_lot` multiple times will display `cannot re-instantiate parking lot` message. Only the first occurrence will create a parking lot.
- executing other commands before `create_parking_lot` will display `parking lot does not exist` message.
- unsupported commands will display `cannot handle unknown operation` message.
- commands failing to satisfy format/args before will display `invalid instruction format` message.


#### Setting up:
Ubuntu 18.04 / MacOS 10.14.6
- Install NodeJS v12.18.3 LTS
- If you are reading this, you are in the right directory.
- run `bin/setup`. It should install the dependencies. Alternatively, run `npm install`.
The app and tests are ready for use and further development.


#### Running tests:
- run `bin/test` or `npm run test`.


#### Running the application:
- The application has two modes of interaction - `cli` and `file`.
- To run in CLI mode, run `bin/parking` or `./main.js`. A prompt `psh>` should appear in the console, ready to process commands.
- To run in file mode just the file path along with either of the commands from the previous step. eg. `bin/parking ./input.txt`.
- This step is optional. Running `npm link` will create a symlink `parkour`. This will let one execute the app by using `parkour` or `parkour <file_path>` commands.


#### Examples:
- Example [input file](examples/input.txt) and the [output file](examples/output.txt) generated after running `bin/parking ./examples/input.txt > ./examples/output.txt`

