package main

import (
	// "bufio"
	"fmt"
	// "io"
	"io/ioutil"
	// "os"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func main() {

	dat, err := ioutil.ReadFile("./day1.txt")
	check(err)
	fmt.Print(string(dat))
}
