(ns advent2020.day2.part2
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(def data (->> (io/resource "day2/input.txt")
               slurp
               str/split-lines))

(defn parse-line [s]
  (let [[_ fst lst char pass] (re-find #"(\d+)-(\d+) (.): (.+)" s)]
    [(- (Long/parseLong fst) 1) (- (Long/parseLong lst) 1) (first char) pass]))

(parse-line (first data))
;; => [8 9 \b "bbktbbbxhfbpb"]

(defn is-valid? [[fst lst char pass]] (let [has-first (= char (nth pass fst))
                                            has-last (= char (nth pass lst))]
                                        ;; (or (and has-first (not has-last)) (and (not has-first) has-last))))
                                        (not= has-first has-last)))
(is-valid? (parse-line (first data)))
;; => false

(count (->>
        data
        (map #(parse-line %))
        (filter #(is-valid? %))))
;; => 388
